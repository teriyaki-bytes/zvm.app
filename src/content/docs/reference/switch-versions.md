---
title: Switch Versions
description: How to switch between installed Zig versions using ZVM.
---

```sh
zvm use <version>
```

Use `use` to switch between versions of Zig. By default, this changes the
global selection. With [per-shell setup](/reference/shell-integration/), it
changes only the current shell. Pass `--global` (or `-g`) to change the global
default explicitly:

```sh
zvm use --global 0.15.2
```

In a configured shell, changing the global default leaves that shell's own
selection in place.

```sh
# Examples
zvm use master
zvm use stable     # highest non-dev, non-master release
zvm use 0.13       # shorthand; resolves to an installed 0.13.x
```

`use` resolves shorthand against versions already installed on your machine.
If the requested version is missing, it prompts to install it. For scripts,
install it first with `zvm i`. See
[Version Syntax](/reference/install-zig/#version-syntax) for the full list of
accepted forms.

## Use a project's minimum Zig version

When called without a version, `zvm use` reads `.minimum_zig_version` from the
current project's `build.zig.zon`:

```sh
zvm use
```

You can also place a ZVM lock directive in `build.zig` and apply it with
`--sync`:

```zig
//! zvm-lock: 0.14.1
```

```sh
zvm use --sync
```

Both forms switch the active Zig symlink, just like an explicit
`zvm use <version>`.

For automatic switching when entering a project, set up
[`zvm env --use-on-cd`](/reference/shell-integration/#switch-when-entering-a-project).
That hook also searches parent directories for a version declaration.

## Use a local Zig build

Link the directory containing your built `zig` executable into the ZVM data
directory under a name of your choice:

```sh
ln -s "$HOME/src/zig/zig-out/bin" "$HOME/.zvm/local"
zvm use local
zvm run local version
```

Use `$ZVM_PATH/local` instead if you configured a custom data directory. On
Windows, the linked directory must contain `zig.exe`.

ZVM treats the link as an installed version. `zvm uninstall` refuses to remove
linked builds, and `zvm dedupe` skips their files. Remove the link yourself
when you no longer need it.
