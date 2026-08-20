---
title: List Versions
description: How to list installed and available Zig versions using ZVM.
---

```sh
# Example
zvm ls
```

Use `ls` to list all installed versions of Zig.

## List remote versions

```sh
zvm list-remote
# Or
zvm ls-remote
```

Use `list-remote` or `ls-remote` to list the versions available for download.
For machine-readable output, add `--json`:

```sh
zvm list-remote --json
```

`zvm ls --all` still works, but is deprecated in favor of `list-remote`.

## List set version maps

```sh
zvm ls --vmu
```

The `--vmu` flag will list set version maps for Zig and ZLS downloads.
