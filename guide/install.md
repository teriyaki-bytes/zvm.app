---
title: Installing ZVM
---

# Installing ZVM

ZVM lives entirely in `$HOME/.zvm` on all platforms it supports. Inside of the
directory, ZVM will download new ZIG versions and symlink whichever version you
specify with `zvm use` to `$HOME/.zvm/bin`. You should add this folder to your
path. After ZVM 0.2.3, ZVMs installer will now add ZVM to `$HOME/.zvm/self`. You
should also add this directory as the environment variable `ZVM_INSTALL`. The
installer should handle this for you automatically if you're on *nix systems,
but you'll have to manually do this on Windows. You can then add
`ZVM_INSTALL to your path.`

If you don't want to use ZVM_INSTALL (like you already have ZVM in a place you
like), then ZVM will update the exact
executable you've called `upgrade` from.

# Linux, BSD, MacOS, *nix

```sh
curl https://raw.githubusercontent.com/tristanisham/zvm/master/install.sh | bash
```
Then add ZVM's directories to your `$PATH`

```sh
echo "# ZVM" >> $HOME/.profile
echo export ZVM_INSTALL="$HOME/.zvm/self" >> $HOME/.profile
echo export PATH="$PATH:$HOME/.zvm/bin" >> $HOME/.profile
echo export PATH="$PATH:$ZVM_INSTALL/" >> $HOME/.profile
```

# Windows

If you're on Windows, please grab the
[latest release](https://github.com/tristanisham/zvm/releases/latest).

## Putting ZVM on your Path

ZVM requires a few directories to be on your `$PATH`. If you don't know how to
update your environment variables perminantly on Windows, you can follow
[this guide](https://www.computerhope.com/issues/ch000549.htm). Once you're in
the appropriate menu, add or append to the following environment variables:

Add

- ZVM_INSTALL: C:\Users\\`%YOUR_USERNAME_HERE%`\\.zvm\bin\self

Append

- PATH: C:\Users\\`%YOUR_USERNAME_HERE%`\\.zvm\bin
- PATH: $ZVM_INSTALL/

## Community Package

### AUR

`zvm` on the [Arch AUR](https://aur.archlinux.org/packages/zvm) is a community
maintained package, and may be out of date.
