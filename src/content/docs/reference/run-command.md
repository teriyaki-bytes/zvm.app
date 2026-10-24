---
title: Run Command
description: How to run a specific Zig version without switching your default.
---

If you want to run a version of Zig without setting it as your default, the
`run` command is your friend.

```sh
zig version
# 0.13.0

zvm run 0.11.0 version
# 0.11.0

zig version
# 0.13.0
```

Shorthand and aliases work too:

```sh
zvm run .12 version
zvm run stable version
```

ZVM resolves shorthand against installed versions first. If none matches, it
checks the remote version map and prompts to install a missing version.
Install the requested version before running commands in scripts that must
avoid prompts. Running an already installed version leaves the global and
per-shell selections unchanged.

See [Version Syntax](/reference/install-zig/#version-syntax) for the full list
of accepted forms.

If the first argument is not a known Zig version, `zvm run` looks for
`.minimum_zig_version` in the current project's `build.zig.zon` and treats all
arguments as the Zig command. This lets a repository declare the version while
you run commands without changing your global selection:

```sh
zvm run build test
```

This can be helpful if you want to test your project on a newer version of Zig
without having to switch between bins, or on alternative flavor of Zig.

## How to use with alternative VMUs

Make sure you switch your VMU before using `run`.

```sh
zvm vmu zig mach
zvm run mach-latest version
# 0.14.0-dev.1911+3bf89f55c
```

If you would like to run the currently set Zig, please keep using the standard
`zig` command.
