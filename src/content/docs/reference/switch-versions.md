---
title: Switch Versions
description: How to switch between installed Zig versions using ZVM.
---

```sh
zvm use <version>
```

Use `use` to switch between versions of Zig.

```sh
# Examples
zvm use master
zvm use stable     # highest non-dev, non-master release
zvm use 0.13       # shorthand; resolves to an installed 0.13.x
```

`use` resolves against versions already installed on your machine. If the
version you want isn't there, install it first with `zvm i`. See
[Version Syntax](/reference/install-zig/#version-syntax) for the full list of
accepted forms.
