---
title: Installing ZVM
description: How to install ZVM on Linux, BSD, macOS, and Windows.
---

By default, ZVM stores Zig installations and
settings in `$HOME/.zvm`, with the global Zig selection linked at
`$HOME/.zvm/bin`. The installer puts ZVM itself in `$HOME/.zvm/self`, sets
`ZVM_INSTALL` to that directory, and adds both directories to your `PATH`.

For a separate Zig selection in each terminal and automatic project switching,
set up [per-shell versions](/reference/shell-integration/) after installation.

If you don't want to use `ZVM_INSTALL` (like you already have ZVM in a place you
like), then ZVM will update the exact executable you've called `upgrade` from.

Installation scripts hosted on `www.zvm.app` are copied from GitHub's `master`
branch when this website is built.

```
www.zvm.app/install.sh === ./install.sh
```

## Linux, BSD, macOS, *nix

```sh
curl https://www.zvm.app/install.sh | bash
```

## Windows

### PowerShell

```ps1
irm https://www.zvm.app/install.ps1 | iex
```

### Command Prompt

```cmd
powershell -c "irm https://www.zvm.app/install.ps1 | iex"
```

## Go

```sh
go install -ldflags "-s -w" github.com/tristanisham/zvm@latest
```

## Manually

Please grab the
[latest release](https://github.com/tristanisham/zvm/releases/latest).

### Verify a release archive

The release workflow publishes `SHA256SUMS` and build provenance attestations.
Download the archive for your platform and `SHA256SUMS` from the same release.
From that directory, verify the archive with the GitHub CLI or check its
checksum:

```sh
gh attestation verify zvm-linux-amd64.tar --repo tristanisham/zvm
sha256sum --check --ignore-missing SHA256SUMS
```

Use your downloaded archive's filename in the attestation command. Attestation
verification checks that it came from this repository's build workflow; the
checksum command checks that it matches the release's checksum file. The
installer scripts and `zvm upgrade` do not verify these release attestations.

### Build from source

Alternatively, you can build the app by cloning the repository and running

```bash
go build .
./zvm
```

If you want to compile ZVM without `zvm upgrade`, such as when packaging ZVM
for a system package manager, build it with the `noAutoUpgrades` tag:

```bash
go build -tags noAutoUpgrades \
  -ldflags "-s -w -X 'main.BuildUpgradeMessage=Use your package manager to upgrade ZVM.'" .
```

## Putting ZVM on your Path

ZVM requires a few directories to be on your `$PATH`.

### Linux, BSD, macOS, *nix

The installer script handles this for you automatically. If you need to set it
up manually, append the following to your shell's startup file (`~/.bashrc`,
`~/.zshrc`, or `~/.profile`):

```sh
export ZVM_INSTALL="$HOME/.zvm/self"
export PATH="$HOME/.zvm/bin:$ZVM_INSTALL:$PATH"
```

Then restart your shell or `source` the file for the changes to take effect.

### Windows

If you don't know how to update your environment variables permanently on
**Windows**, you can follow
[this guide](https://www.computerhope.com/issues/ch000549.htm). Once you're in
the appropriate menu, add or append to the following environment variables:

Add

- ZVM_INSTALL: `%USERPROFILE%\.zvm\self`

Append

- PATH: `%USERPROFILE%\.zvm\bin`
- PATH: `%ZVM_INSTALL%`

## Configure ZVM path

Set `ZVM_PATH` to replace the default `~/.zvm` data directory. For an XDG-style
location, add this before your shell integration:

```sh
export ZVM_PATH="${XDG_DATA_HOME:-$HOME/.local/share}/zvm"
export PATH="$ZVM_PATH/bin:$PATH"
```

This changes where Zig versions, settings, aliases, and the deduplication store
live. Keep the directory containing the ZVM executable on `PATH` too.

## Community Packages

### AUR

ZVM on the [Arch AUR](https://aur.archlinux.org/packages/zvm) is a
community-maintained package, and may be out of date.
