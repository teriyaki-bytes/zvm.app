---
title: Help & Version
description: How to print help information and version for ZVM.
---

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
zvm version        # same output — added in v0.8.19
```

Both forms print the version of ZVM you have installed. The `version`
subcommand was added for tooling and shells that parse subcommands but not
global flags.

## Shell Completion

ZVM can emit a completion script for `bash`, `zsh`, `fish`, or `pwsh`
(PowerShell). The script is generated from ZVM's live command tree, so it
always reflects the commands and flags of the `zvm` binary you ran it with.

```sh
zvm completion bash
zvm completion zsh
zvm completion fish
zvm completion pwsh
```

### Bash

Source the script for the current session:

```sh
source <(zvm completion bash)
```

To load it on every new shell, write it to `bash-completion`'s load path:

```sh
zvm completion bash > /etc/bash_completion.d/zvm           # system-wide
# or for a single user:
zvm completion bash > ~/.local/share/bash-completion/completions/zvm
```

### Zsh

Place the script somewhere on your `$fpath` as `_zvm`:

```sh
zvm completion zsh > "${fpath[1]}/_zvm"
```

Then ensure `compinit` is running in your `~/.zshrc`:

```sh
autoload -Uz compinit && compinit
```

### Fish

```sh
zvm completion fish > ~/.config/fish/completions/zvm.fish
```

Fish picks this up automatically on the next shell.

### PowerShell

```powershell
zvm completion pwsh > $PROFILE.CurrentUserAllHosts\..\zvm.ps1
```

Then dot-source the file from your PowerShell profile (`$PROFILE`):

```powershell
. "$HOME\Documents\PowerShell\zvm.ps1"
```
