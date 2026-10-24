---
title: Help & Version
description: How to print help information and version for ZVM.
---

<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/help-and-version.webp" aria-label="Terminal recording: zvm --version prints the version, and zvm use --help prints help for one command">
    <source src="/videos/help-and-version.webm" type="video/webm" />
    <source src="/videos/help-and-version.mp4" type="video/mp4" />
  </video>
</figure>

## Print program help

Print global help information by running:

```sh
zvm --help
```

Print help information about a specific command or subcommand.

```sh
zvm list --help
```

Use the help output from your installed binary for its current commands,
options, and aliases. For example, `list` also accepts the alias `ls`;
use `list-remote` or `ls-remote` to see downloadable versions.

## Print program version

```sh
zvm --version
zvm version        # same output — added in v0.8.19
```

Both forms print the version of ZVM you have installed. The `version`
subcommand was added for tooling and shells that parse subcommands but not
global flags.

These docs cover the ZVM version shown at the top of the page. If a documented
command is missing, check your installed version and
[upgrade ZVM](/reference/upgrade-zvm/).

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

Place the script somewhere on your `$fpath` as `_zvm`. Pick a user-writable
directory so you don't need `sudo`:

```sh
# Plain zsh — create a user completions dir and add it to $fpath in ~/.zshrc:
mkdir -p ~/.zsh/completions
zvm completion zsh > ~/.zsh/completions/_zvm

# Then in ~/.zshrc (before `compinit`):
fpath=(~/.zsh/completions $fpath)
```

If you use [Oh My Zsh](https://ohmyz.sh/), drop it into the custom completions
directory instead — Oh My Zsh adds it to `$fpath` automatically:

```sh
mkdir -p ~/.oh-my-zsh/custom/completions
zvm completion zsh > ~/.oh-my-zsh/custom/completions/_zvm
```

Then ensure `compinit` is running in your `~/.zshrc` (Oh My Zsh already does
this for you):

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
zvm completion pwsh > $HOME/.zvm/zvm.ps1
```

Then dot-source the file from your PowerShell profile (`$PROFILE`):

```powershell
. "$HOME/.zvm/zvm.ps1"
```
