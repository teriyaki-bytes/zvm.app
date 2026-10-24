---
title: Set Up Per-Shell Versions
description: Give each shell its own Zig version and switch automatically when entering a project.
---

ZVM v0.9.4 can give each shell its own Zig version. Add the setup command for
your shell to its startup file, after ZVM's existing `PATH` configuration.

## Bash

Add to `~/.bashrc`:

```sh
eval "$(zvm env --shell bash --use-on-cd)"
```

## Zsh

Add to `~/.zshrc`:

```sh
eval "$(zvm env --shell zsh --use-on-cd)"
```

## Fish

Add to `~/.config/fish/config.fish`:

```fish
zvm env --shell fish --use-on-cd | source
```

## PowerShell

Add to your PowerShell profile (`$PROFILE`):

```powershell
zvm env --shell powershell --use-on-cd | Out-String | Invoke-Expression
```

Restart your shell or evaluate the command in the current session. `zvm env`
prints shell code; evaluating that code applies the setup. Omit `--use-on-cd`
if you want per-shell versions without automatic switching. `--shell` accepts
`bash`, `zsh`, `fish`, and `powershell` (also `pwsh`); when omitted, ZVM detects
the shell from `$SHELL`.

## Switch this shell or the global default

New shells start with the global Zig version. After setup, `zvm use` changes
only the current shell:

```sh
zvm use 0.15.2             # this shell
zvm use --global 0.15.2    # default for new shells; -g is the short form
```

Changing the global default leaves the current shell's selection in place.
Programs launched from a configured shell inherit its `ZVM_MULTISHELL_PATH`,
so a script or editor running `zvm use` changes that shell's selection too.
Use `zvm run <version> ...` to run one Zig command with a version already
installed without switching either selection.

## Switch when entering a project

With `--use-on-cd`, ZVM searches the current directory and its parents for a
version declaration. It uses the nearest directory declaring a version; within
that directory, `//! zvm-lock: <version>` in `build.zig` takes precedence over
`.minimum_zig_version` in `build.zig.zon`.

```zig
//! zvm-lock: 0.15.2
```

If the version is missing, ZVM prints installation instructions instead of
prompting or downloading it. Leaving a project keeps its selected version.

In Bash, switching happens before the next prompt. A single line such as
`cd my-project && zig build` still uses the previous version. Zsh, Fish, and
PowerShell switch when you change directories.

## Link storage and cleanup

ZVM creates per-shell links in your user cache directory, exports the link as
`ZVM_MULTISHELL_PATH`, and prepends it to `PATH`. To choose another location,
set `ZVM_MULTISHELL_DIR` to an absolute path outside the ZVM data directory.

`zvm clean` removes per-shell links older than a week when their shell has
exited.
