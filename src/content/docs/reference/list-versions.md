---
title: List Versions
description: How to list installed and available Zig versions using ZVM.
---

```sh
# Example
zvm ls
```

Use `ls` to list all installed version of Zig.

## List all versions of Zig available

```sh
zvm ls --all
```

The `--all` flag will list the available verisons of Zig for download. Not the
versions locally installed.

## List set version maps

```sh
zvm ls --vmu
```

The `--vmu` flag will list set version maps for Zig and ZLS downloads.
