---
title: Install Zig
description: How to install Zig versions using ZVM.
---

```sh
zvm install <version>
# Or
zvm i <version>
```

Use `install` or `i` to download a specific version of Zig. To install the
latest nightly, use `master`; for the latest stable tagged release, use
`stable`.

```sh
# Example
zvm i master
zvm i stable
zvm i 0.13            # shorthand — resolves to 0.13.0
zvm i .15             # shorthand — resolves to the highest 0.15.x
```

See the [Version Syntax](#version-syntax) section below for the full set of
accepted version strings. The same rules apply to `zvm use`, `zvm run`, and
`zvm rm`.

## Force Install

As of `v0.7.6` ZVM will now skip downloading a version if it is already
installed. You can always force an install with the `--force` or `-f` flag.

```sh
zvm i --force master
```

You can also enable the old behavior by setting the new `alwaysForceInstall`
field to `true` in `~/.zvm/settings.json`.

## Install ZLS with ZVM

You can now install ZLS with your Zig download! To install ZLS with ZVM, simply
pass the `--zls` flag with `zvm i`. For example:

```sh
zvm i --zls master
```

### Select ZLS compatibility mode

By default, ZVM will install a ZLS build, which can be used with the given Zig
version, but may not be able to build ZLS from source. If you want to use a ZLS
build, which can be built using the selected Zig version, pass the `--full` flag
with `zvm i --zls`. For example:

```sh
zvm i --zls --full master
```

**This does not apply to tagged releases, e.g.: `0.13.0`**

## Version Syntax

As of v0.8.19, the commands that take a Zig version — `install`, `use`, `run`,
and `rm` — accept several forms:

| Input     | Resolves to                                           |
| --------- | ----------------------------------------------------- |
| `0.14.1`  | `0.14.1` (exact tagged release)                       |
| `0.13`    | `0.13.0` (shorthand — highest `0.13.x`)               |
| `0.15`    | `0.15.2` (shorthand — highest `0.15.x`)               |
| `.12`     | `0.12.1` (leading dot implies `0.`)                   |
| `master`  | Zig's nightly build (passes through unchanged)        |
| `stable`  | The highest non-dev, non-master tagged release        |
| `latest`  | Reserved; currently passes through unchanged          |

When shorthand is expanded, ZVM prints a line like `Resolved "0.13" to 0.13.0`
to stdout. Parse that line if you need the concrete version in scripting.

**Resolution scope matters.** `install` resolves against the *remote* version
map (the Zig download index by default, or your configured
[version map](/reference/version-maps)). `use`, `rm`, and `run` resolve
against versions that are *locally installed* — you cannot `use 0.13` unless
some `0.13.x` has already been installed.

Shorthand and aliases also propagate to the `--zls` installer, so
`zvm i --zls .13` now installs the matching ZLS build instead of failing
with an empty-version error.

## Cross-target installs

You can override the OS and architecture ZVM downloads for. This is useful
on hosts like FreeBSD where a given Zig version may have no native prebuilt
binary, but a Linux or macOS build will run under emulation or compatibility
layers.

Use the flags:

```sh
zvm i --target-os linux --target-arch x86_64 0.14.0
```

Or set environment variables so every install in the session inherits the
override:

```sh
export ZVM_TARGET_OS=linux
export ZVM_TARGET_ARCH=x86_64
zvm i 0.14.0
```

Both Go-style names (`darwin`, `amd64`, `arm64`) and Zig-style names
(`macos`, `x86_64`, `aarch64`) are accepted, and values are
case-insensitive.
