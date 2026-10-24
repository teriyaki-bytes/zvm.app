#!/usr/bin/env bash
# Record the terminal demos with vhs and publish them to public/videos.
#
# Usage: demo/record.sh [tape ...]      default: every tape in demo/tapes.py
#        python3 demo/tapes.py --list   list tapes
#
# Recording happens in the vhs container as user "zig" on host "zig" with a
# "$ " prompt and its own ZVM data directory, so nothing from your machine
# (username, hostname, paths, ~/.zvm) can appear in a video.
#
# Needs: podman, go, ffmpeg, python3 with Pillow, and the zvm source checkout
# (ZVM_SRC, default ../zvm next to this repo). Work files go in demo/.work/.
set -euo pipefail

DEMO="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$DEMO")"
WORK="$DEMO/.work"
VIDEOS="$ROOT/public/videos"
IMAGE="ghcr.io/charmbracelet/vhs"
ZVM_SRC="${ZVM_SRC:-$ROOT/../zvm}"

# Versions every "main" tape can rely on. The dedupe home gets a wider spread,
# including patch-release pairs that share most of the standard library.
MAIN_VERSIONS=(0.13.0 0.14.1)
DEDUPE_VERSIONS=(0.11.0 0.12.0 0.12.1 0.13.0 0.14.0 0.14.1 0.15.1 0.15.2 0.16.0 0.17.0)

container() { # container <zvm data dir> <podman run args...>
  local data="$1"
  shift
  podman run --rm --hostname zig \
    -e HOME=/home/zig -e USER=zig -e LOGNAME=zig \
    -e ZVM_PATH=/home/zig/.zvm -e ZVM_INSTALL=/home/zig/.zvm/self \
    -e PATH=/home/zig/.zvm/bin:/home/zig/.zvm/self:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    -e PS1='$ ' \
    -v "$data:/home/zig/.zvm:Z" -v "$WORK/projects:/home/zig/projects:Z" \
    -v "$WORK/tapes:/vhs:Z" -w /vhs "$@"
}

install_versions() { # install_versions <zvm data dir> <versions...>
  local data="$1"
  shift
  mkdir -p "$data/self"
  cp "$WORK/zvm" "$data/self/zvm"
  container "$data" --entrypoint bash "$IMAGE" -c '
    for v in "$@"; do
      zvm i --skip-use "$v" >/dev/null 2>&1 || { echo "failed to install Zig $v" >&2; exit 1; }
    done
    zvm i --zls 0.15.2 >/dev/null 2>&1' _ "$@"
}

fresh_dedupe_home() { # Deduplication changes the files, so start over every time.
  [ -d "$WORK/dedupe" ] && podman unshare rm -rf "$WORK/dedupe"
  echo "Installing ${#DEDUPE_VERSIONS[@]} Zig versions for the dedupe recording..."
  install_versions "$WORK/dedupe" "${DEDUPE_VERSIONS[@]}"
}

publish() { # publish <tape name>
  local name="$1" src="$WORK/tapes/out/$1.mp4"
  local vf=()
  # Homepage clips keep their fixed size; reference clips are cropped to content.
  if [[ "$name" != home-* ]]; then
    vf=(-vf "crop=iw:$(python3 -I "$DEMO/content_height.py" "$src"):0:0")
  fi
  ffmpeg -nostdin -loglevel error -y -i "$src" "${vf[@]}" -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -an "$VIDEOS/$name.webm"
  ffmpeg -nostdin -loglevel error -y -i "$src" "${vf[@]}" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an "$VIDEOS/$name.mp4"
  ffmpeg -nostdin -loglevel error -y -sseof -0.3 -i "$src" "${vf[@]}" -frames:v 1 -c:v libwebp -quality 80 "$VIDEOS/$name.webp"
}

mkdir -p "$WORK/projects" "$WORK/tapes/out" "$VIDEOS"
cp "$DEMO/theme.tape" "$WORK/tapes/theme.tape"

echo "Building zvm from $ZVM_SRC..."
(cd "$ZVM_SRC" && CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o "$WORK/zvm" .)
podman pull -q "$IMAGE" >/dev/null

if [ $# -eq 0 ]; then
  mapfile -t TAPE_NAMES < <(python3 -I "$DEMO/tapes.py" --list | cut -f1)
else
  TAPE_NAMES=("$@")
fi
python3 -I "$DEMO/tapes.py" "$WORK/tapes" "${TAPE_NAMES[@]}"

echo "Preparing the shared ZVM data directory..."
install_versions "$WORK/main" "${MAIN_VERSIONS[@]}"

for name in "${TAPE_NAMES[@]}"; do
  data="$WORK/main"
  if [ "$(python3 -I "$DEMO/tapes.py" --list | awk -F'\t' -v n="$name" '$1 == n { print $3 }')" = dedupe ]; then
    fresh_dedupe_home
    data="$WORK/dedupe"
  fi
  echo "Recording $name..."
  container "$data" "$IMAGE" "$name.tape" >"$WORK/$name.log" 2>&1 || {
    echo "vhs failed for $name; see $WORK/$name.log" >&2
    exit 1
  }
  publish "$name"
done

echo "Published to $VIDEOS: ${TAPE_NAMES[*]}"
