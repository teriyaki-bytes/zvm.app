 How to use ZVM

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

You can now install ZLS with your Zig download! To install ZLS with ZVM, simply
pass the `--zls` flag with `zvm i`. For example:

```sh
zvm i --zls master
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

### List all versions of Zig available

```sh
zvm ls --all
```

The `--all` flag will list the available verisons of Zig for download. Not the
versions locally installed.

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

### Version Map Source

```sh
vmu "https://validurl.local/vmu.json" # Change the source ZVM pulls Zig release information from. Good for self-hosted Zig CDNs.
                                       # ZVM only supports schemas that match the offical version map schema. 
                                       # Run `vmu default` to reset your version map.

vmu default # Resets back to default Zig releases.
vmu mach # Sets ZVM to pull from Mach nominated Zig.
```

## Use a Custom Mirror Distribution Server
ZVM now lets you set your own Mirror Distribution Server. If you cannot or choose not to use the official Zig mirror list, you can host your own, or use another grouping of mirrors.

```sh
zvm mirrorlist <url>
# Reset to the official mirror
zvm mirrorlist default
```

## Print program help

```sh
zvm help
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