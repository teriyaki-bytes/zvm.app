---
title: Installing ZVM
description: How to install ZVM on Linux, BSD, macOS, and Windows.
---

ZVM lives entirely in `$HOME/.zvm` on all platforms it supports. Inside of the
directory, ZVM will download new ZIG versions and symlink whichever version you
specify with `zvm use` to `$HOME/.zvm/bin`. You should add this folder to your
path. After ZVM 0.2.3, ZVM's installer will now add ZVM to `$HOME/.zvm/self`.
You should also add this directory as the environment variable `ZVM_INSTALL`.
The installer scripts should handle this for you automatically on *nix and
Windows systems.

If you don't want to use `ZVM_INSTALL` (like you already have ZVM in a place you
like), then ZVM will update the exact executable you've called `upgrade` from.

All installation scripts hosted on `www.zvm.app` are identical to, and are
automatically synced with their respective copies on GitHub.

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

Alternatively, you can build the app by cloning the repository and running

```bash
go build .
./zvm
```

If you want to compile ZVM without the ability to run `zvm upgrade` (self-update), like if you're including it as a system dependency or want to distrubute it via a package manager
you can build it with the `noAutoUpgrades` tag.

```bash
go build -tags noAutoUpgrades .
```

instead for building the app.

### Putting ZVM on your Path (Windows)

ZVM requires a few directories to be on your `$PATH`. If you don't know how to
update your environment variables permanently on **Windows**, you can follow
[this guide](https://www.computerhope.com/issues/ch000549.htm). Once you're in
the appropriate menu, add or append to the following environment variables:

Add

- ZVM_INSTALL: `%USERPROFILE%\.zvm\self`

Append

- PATH: `%USERPROFILE%\.zvm\bin`
- PATH: `%ZVM_INSTALL%`

### Configure ZVM path

It is possible to overwrite the default behavior of ZVM to adhere to XDG
specification on Linux. There's an environment variable `ZVM_PATH`. Setting it
to `$XDG_DATA_HOME/zvm` will do the trick.

## Community Packages

### AUR

ZVM on the [Arch AUR](https://aur.archlinux.org/packages/zvm) is a
community-maintained package, and may be out of date.
