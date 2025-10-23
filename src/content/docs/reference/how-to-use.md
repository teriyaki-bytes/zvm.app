---
title: How to Use ZVM
description: A list of ZVM's commands, flags, and environment variable. As well as how to use them.
---

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

### Force Install

As of `v0.7.6` ZVM will now skip downloading a version if it is already
installed. You can always force an install with the `--force` or `-f` flag.

```sh
zvm i --force master
```

You can also enable the old behavior by setting the new `alwaysForceInstall`
field to `true` in `~/.zvm/settings.json`.

### Install ZLS with ZVM

You can now install ZLS with your Zig download! To install ZLS with ZVM, simply
pass the `--zls` flag with `zvm i`. For example:

```sh
zvm i --zls master
```

#### Select ZLS compatibility mode

By default, ZVM will install a ZLS build, which can be used with the given Zig
version, but may not be able to build ZLS from source. If you want to use a ZLS
build, which can be built using the selected Zig version, pass the `--full` flag
with `zvm i --zls`. For example:

```sh
zvm i --zls --full master
```

> [!IMPORTANT]
> This does not apply to tagged releases, e.g.: `0.13.0`

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

### List all versions of Zig available

```sh
zvm ls --all
```

The `--all` flag will list the available verisons of Zig for download. Not the
versions locally installed.

### List set version maps

```sh
zvm ls --vmu
```

The `--vmu` flag will list set version maps for Zig and ZLS downloads.

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

## Run installed version of Zig without switching your default

If you want to run a version of Zig without setting it as your default, the new
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
run mach-latest version
# 0.14.0-dev.1911+3bf89f55c
```

If you would like to run the currently set Zig, please keep using the standard
`zig` command.

## Set Version Map Source

ZVM lets choose your vendor for Zig and ZLS. This is great if your company hosts
it's own internal fork of Zig, you prefer a different flavor of the language,
like Mach.

```sh
zvm vmu zig "https://machengine.org/zig/index.json" # Change the source ZVM pulls Zig release information from.

zvm vmu zls https://validurl.local/vmu.json
                                       # ZVM only supports schemas that match the offical version map schema. 
                                       # Run `vmu default` to reset your version map.

zvm vmu zig default # Resets back to default Zig releases.
zvm vmu zig mach # Sets ZVM to pull from Mach nominated Zig.

zvm vmu zls default # Resets back to default ZLS releases.
```
## Use a Custom Mirror Distribution Server
ZVM now lets you set your own Mirror Distribution Server. If you cannot or choose not to use the official Zig mirror list, you can host your own, or use another grouping of mirrors.

```sh
zvm mirrorlist <url>
# Reset to the official mirror
zvm mirrorlist default
```

## Print program help

Print global help information by running:

```sh
zvm --help
```

Print help information about a specific command or subcommand.

```sh
zvm list --help
```

```
NAME:
   zvm list - list installed Zig versions. Flag `--all` to see remote options

USAGE:
   zvm list [command options] [arguments...]

OPTIONS:
   --all, -a   list remote Zig versions available for download, based on your version map (default: false)
   --vmu       list set version maps (default: false)
   --help, -h  show help
```

## Print program version

```sh
zvm --version
```

Prints the version of ZVM you have installed.

<hr>

## Option flags

### Color Toggle

Enable or disable colored ZVM output. No value toggles colors.

#### Enable

- on
- yes/y
- enabled
- true

#### Disabled

- off
- no/n
- disabled
- false

```sh
--color # Toggle ANSI color printing on or off for ZVM's output, i.e. --color=true
```

## Environment Variables

- `ZVM_DEBUG` enables DEBUG logging for your executable. This is meant for
  contributors and developers.
- `ZVM_SET_CU` Toggle the automatic upgrade checker. If you want to reenable the
  checker, just `uset ZVM_SET_CU`.
- `ZVM_PATH` replaces the default install location for ZVM Set the environment
  variable to the parent directory of where you've placed the `.zvm` directory.
- `ZVM_SKIP_TLS_VERIFY` Do you have problems using TLS in your evironment?
  Toggle off verifying TLS by setting this environment variable.
  - By default when this is enabled ZVM will print a warning. Set this variable
    to `no-warn` to silence this warning.

## Settings

ZVM has additional setting stored in `~/.zvm/settings.json`. You can manually
update version maps, toggle color support, and disable the automatic upgrade
checker here. All settings are also exposed as flags or environment variables.
This file is stateful, and ZVM will create it if it does not exist and utilizes
it for its operation.
