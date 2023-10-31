---
title: How to use ZVM
---

# How to use ZVM

## Install

```sh
zvm install <version>
# Or
zvm i <version>
```

Use `install` or `i` to download a specific version of Zig. To install the
latest version, use "master".

```sh
# Example
zvm i master
```
### Install ZLS with ZVM
 You can now install ZLS with your Zig download! To install ZLS with ZVM, simply pass the `-D=zls` flag with `zvm i`. For example:
```sh
zvm i -D=zls master
```

## Switch between installed Zig versions

```sh
zvm use <version>
```

Use `use` to switch between versions of Zig.

```sh
# Example
zvm use master
```

## List installed Zig versions

```sh
# Example
zvm ls
```

Use `ls` to list all installed version of Zig.

## Uninstall a Zig version

```sh
# Example
zvm rm 0.10.0
```

Use `uninstall` or `rm` to remove an uninstalled version from your system.

## Upgrade your ZVM installation

As of `zvm v0.2.3` you can now upgrade your ZVM installation from, well, zvm.
Just run:

```sh
zvm upgrade
```

The latest version of ZVM should install on your machine, regardless of where
your binary lives (though if you have your binary in a privaledged folder, you
may have to run this command with `sudo`).

## Clean up build artifacts

```sh
# Example
zvm clean
```

Use `clean` to remove build artifacts (Good if you're on Windows).

## Print program version

```sh
zvm version
# Or
zvm --version
# Or
zvm -v
```

Prints the version of ZVM you have installed.

## Print program help

```sh
zvm help
# Or
zvm --help
# Or
zvm -h
```

<hr>

## Option flags

```sh
--nocolor, --nocolour   # Turns off ANSI color.
--color, --colour       # Toggles ANSI color.
--yescolor, --yescolour # Turns on ANSI color.
```