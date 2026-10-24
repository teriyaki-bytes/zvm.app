"""Terminal recordings for zvm.app, written out as vhs tapes.

Each entry describes one recording:
  size     HOME (fixed 1000x540, used side by side on the homepage) or a
           height in px for a 1200px-wide reference clip that is cropped
           to its content when published.
  setup    commands run off camera before recording (output hidden).
  steps    commands typed on camera. A tuple ("tui", cmd, keys) opens an
           interactive command and presses `keys` before waiting for the prompt.
  home     which ZVM data directory to use: "main" (shared, seeded with a few
           versions) or "dedupe" (a fresh directory with ten versions, rebuilt
           for every recording so the savings are real).

Usage: python3 demo/tapes.py OUT_DIR [name ...]   (writes OUT_DIR/<name>.tape)
       python3 demo/tapes.py --list
"""

import os
import sys

HOME = {"width": 1000, "font": 16, "height": 540}

OLD_GAME = [
    "mkdir -p ~/projects/old-game",
    "printf '//! zvm-lock: 0.14.1\\nconst std = @import(\"std\");\\n' > ~/projects/old-game/build.zig",
    "zvm use --global 0.15.2",
]
SHELL_STEPS = [
    'eval "$(zvm env --shell bash --use-on-cd)"',
    "zig version",
    "head -n 1 projects/old-game/build.zig",
    "cd projects/old-game",
    "zig version",
]

TAPES = {
    # Homepage feature rows: all the same size.
    "home-install": dict(size=HOME, setup=["zvm use 0.15.2", "zvm rm master"], steps=["zvm i master --zls"]),
    "home-switch": dict(size=HOME, setup=["zvm use 0.15.2"], steps=[
        "zvm ls", "zvm use 0.14.1", "zig version", "zvm use 0.15.2", "zig version",
    ]),
    "home-shell": dict(size=HOME, setup=OLD_GAME, steps=SHELL_STEPS),
    "home-dedupe": dict(size=HOME, home="dedupe", setup=["zvm use 0.15.2"], steps=["zvm dedupe"]),

    # Reference pages: 1200px wide, cropped to content on publish.
    "install-master-zls": dict(size=560, setup=["zvm use 0.15.2", "zvm rm master"], steps=["zvm i master --zls"]),
    "switch-versions": dict(size=420, setup=["zvm use 0.15.2"], steps=[
        "zvm use 0.14.1", "zig version", "zvm use 0.15.2", "zig version",
    ]),
    "shell-integration": dict(size=500, setup=OLD_GAME, steps=SHELL_STEPS),
    "list-versions": dict(size=520, setup=["zvm use 0.15.2"], steps=["zvm ls", "zvm ls-remote | head -n 10"]),
    "manage-aliases": dict(size=440, setup=["zvm use 0.15.2", "zvm alias --clear"], steps=[
        "zvm alias work 0.14.1", "zvm alias", "zvm run work version",
    ]),
    "run-command": dict(size=380, setup=["zvm i --skip-use 0.13.0", "zvm use 0.15.2"], steps=[
        "zig version", "zvm run 0.14.1 version", "zvm run .13 version",
    ]),
    "configuring-settings": dict(size=620, setup=["zvm use 0.15.2"], steps=[
        "zvm settings .useColor",
        ("tui", "zvm settings", ["Down", "Down", "Down", "Up", "Up", "Up", "q"]),
    ]),
    "help-and-version": dict(size=560, setup=[], steps=["zvm --version", "zvm use --help"]),
    "version-maps": dict(size=460, setup=["zvm vmu zig default"], steps=[
        "zvm vmu zig mach", "zvm ls --vmu", "zvm vmu zig default",
    ]),
    "uninstall-zig": dict(size=440, setup=["zvm i --skip-use 0.13.0", "zvm use 0.15.2"], steps=[
        "zvm ls", "zvm rm 0.13.0", "zvm ls",
    ]),
}

KEYS = {"Down", "Up", "Left", "Right", "Enter", "Escape", "Tab", "Space"}


def tape(name, spec):
    size = spec["size"] if isinstance(spec["size"], dict) else {"height": spec["size"]}
    out = ['Source "theme.tape"']
    if "width" in size:
        out += [f"Set Width {size['width']}", f"Set FontSize {size['font']}"]
    out += [
        f"Set Height {size['height']}",
        # vhs trims trailing spaces from screen lines, so match "$" with optional space.
        "Set WaitPattern /\\$\\s*$/",
        "Set WaitTimeout 15m",
        f'Output "out/{name}.webm"',
        f'Output "out/{name}.mp4"',
        "Hide",
        "Type \"cd ~ && export PS1='$ '\" Enter",
    ]
    for cmd in spec["setup"]:
        quiet = cmd if ">" in cmd else cmd + " >/dev/null 2>&1"
        out.append(f"Type `{quiet}` Enter")
    out += ['Type "clear" Enter', "Wait", "Show", "Sleep 600ms"]
    for step in spec["steps"]:
        if isinstance(step, tuple):
            _, cmd, keys = step
            out += [f"Type `{cmd}`", "Sleep 400ms", "Enter", "Sleep 2s"]
            for k in keys:
                out += [k if k in KEYS else f'Type "{k}"', "Sleep 700ms"]
            out += ["Wait", "Sleep 1s"]
        else:
            out += [f"Type `{step}`", "Sleep 400ms", "Enter", "Wait", "Sleep 1.6s"]
    out.append("Sleep 1.5s")
    return "\n".join(out) + "\n"


def main(argv):
    if argv[:1] == ["--list"]:
        for name, spec in TAPES.items():
            kind = "home" if isinstance(spec["size"], dict) else "reference"
            print(f"{name}\t{kind}\t{spec.get('home', 'main')}")
        return
    out_dir, names = argv[0], argv[1:] or list(TAPES)
    os.makedirs(out_dir, exist_ok=True)
    for name in names:
        if name not in TAPES:
            sys.exit(f"unknown tape: {name} (see --list)")
        with open(os.path.join(out_dir, f"{name}.tape"), "w") as f:
            f.write(tape(name, TAPES[name]))


if __name__ == "__main__":
    main(sys.argv[1:])
