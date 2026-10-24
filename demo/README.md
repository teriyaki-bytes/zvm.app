# Terminal recordings

The videos in `public/videos/` are recorded with [vhs](https://github.com/charmbracelet/vhs)
from the tapes defined in `tapes.py`.

```sh
demo/record.sh                      # record and publish every tape
demo/record.sh home-dedupe          # just one (or several) by name
python3 demo/tapes.py --list        # tape names, kind, and ZVM data directory
```

`record.sh` builds `zvm` from the source checkout (`ZVM_SRC`, default `../zvm`),
installs the Zig versions the tapes rely on, records each tape, and writes
`<name>.webm`, `<name>.mp4`, and a `<name>.webp` poster to `public/videos/`.
Requires podman, Go, ffmpeg, and Python 3 with Pillow. Work files, including
several GB of Zig installs, live in `demo/.work/` (git-ignored); delete it when
you're done.

## No personal details

Recording runs inside the `ghcr.io/charmbracelet/vhs` container as user `zig`
on host `zig`, with a `$ ` prompt and its own ZVM data directory. Your
username, hostname, home path, and `~/.zvm` never appear, and the binary is
built with `-trimpath`. Keep it that way: don't record on the host.

## Adding a tape

Add an entry to `TAPES` in `tapes.py`:

- `size`: `HOME` for homepage feature rows (fixed 1000×540, so rows line up),
  or a height in px for a 1200px-wide reference clip. Reference clips are
  cropped to their content when published, so overshoot the height.
- `setup`: commands run off camera first. Make each tape set up the versions it
  needs instead of relying on another tape having run.
- `steps`: commands typed on camera. Use `("tui", cmd, keys)` for interactive
  commands such as `zvm settings`.
- `home="dedupe"`: use a fresh data directory with ten Zig versions, rebuilt
  before every recording so `zvm dedupe` shows real savings.

Then embed it on a reference page right after the frontmatter:

```html
<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/NAME.webp" aria-label="Terminal recording: WHAT IT SHOWS">
    <source src="/videos/NAME.webm" type="video/webm" />
    <source src="/videos/NAME.mp4" type="video/mp4" />
  </video>
</figure>
```

The look (colours, font, padding) is in `theme.tape` and matches the site's
warm brown and orange.
