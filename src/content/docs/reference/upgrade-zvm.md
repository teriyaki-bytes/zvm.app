---
title: Upgrade ZVM
description: How to upgrade your ZVM installation and clean up build artifacts.
---

# Install ZVM from GitHub
Your copy of ZVM may ship with an auto-upgrade command. If you have installed ZVM from [GitHub](https://github.com/tristanisham/zvm) or [zvm.app](https://www.zvm.app) you can upgrade to the latest version of ZVM with `zvm upgrade`. 


The latest version of ZVM should install on your machine, regardless of where
your binary lives (though if you have your binary in a privileged folder, you
may have to run this command with `sudo`).

# Install via a package manager
If you have installed ZVM via a package manager, your system's maintainer may have compiled ZVM without its default upgrade behavior. The maintainer should have customized the ZVM binary so that it prints how to upgrade itself.

```go

go build -ldflags=-w -s -X 'main.BuildUpgradeMessage=Command to upgrade ZVM goes here.'
```

Try using your system's package manager.

## Clean up build artifacts

```sh
# Example
zvm clean
```

Use `zvm clean` to remove build artifacts (Good if you're on Windows).
