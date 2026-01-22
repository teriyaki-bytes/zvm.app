---
title: Installing ZVM
description: A guide in my new Starlight docs site.
---

ZVM lives entirely in `$HOME/.zvm` on all platforms it supports. Inside of the
directory, ZVM will download new ZIG versions and link whichever version you
specify with `zvm use` to `$HOME/.zvm/bin`. You should add this folder to your
path. After ZVM 0.2.3, ZVM's installer will now add ZVM to `$HOME/.zvm/self`. You
should also add this directory as the environment variable `ZVM_INSTALL`. The
installer should handle this for you automatically if you're on *nix systems,
but you'll have to manually do this on Windows. You can then add
`ZVM_INSTALL` to your path.

If you don't want to use ZVM_INSTALL (like you already have ZVM in a place you
like), then ZVM will update the exact
executable you've called `upgrade` from.

# Linux, BSD, macOS, *nix

```sh
curl https://raw.githubusercontent.com/tristanisham/zvm/master/install.sh | bash
```

# Windows

## PowerShell
 ```ps1
 irm https://raw.githubusercontent.com/tristanisham/zvm/master/install.ps1 | iex
 ```
## Command Prompt
```cmd
powershell -c "irm https://raw.githubusercontent.com/tristanisham/zvm/master/install.ps1 | iex"

```

# If You Have a Valid Version of Go Installed
```sh
go install -ldflags "-s -w" github.com/tristanisham/zvm@latest
```


## Manually

Please grab the
[latest release](https://github.com/tristanisham/zvm/releases/latest).

## Putting ZVM on your Path

ZVM requires a few directories to be on your `$PATH`. If you don't know how to
update your environment variables permanently on Windows, you can follow
[this guide](https://www.computerhope.com/issues/ch000549.htm). Once you're in
the appropriate menu, add or append to the following environment variables:

Add

- ZVM_INSTALL: C:\Users\\`%YOUR_USERNAME_HERE%`\\.zvm\bin\self

Append

- PATH: C:\Users\\`%YOUR_USERNAME_HERE%`\\.zvm\bin
- PATH: $ZVM_INSTALL/

## Community Package

### AUR

ZVM on the [Arch AUR](https://aur.archlinux.org/packages/zvm) is a community-maintained package, and may be out of date.
