---
title: Upgrade ZVM
description: How to upgrade your ZVM installation and clean up build artifacts.
---

As of `zvm v0.2.3` you can now upgrade your `zvm` installation from, well, `zvm`.
Just run:

```sh
zvm upgrade
```

The latest version of ZVM should install on your machine, regardless of where
your binary lives (though if you have your binary in a privileged folder, you
may have to run this command with `sudo`).

## Clean up build artifacts

```sh
# Example
zvm clean
```

Use `zvm clean` to remove build artifacts (Good if you're on Windows).
