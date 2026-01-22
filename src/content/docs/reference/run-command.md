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
