---
title: Uninstall Zig
description: How to uninstall Zig versions using ZVM.
---

```sh
# Examples
zvm rm 0.10.0
zvm rm 0.13        # shorthand; resolves to an installed 0.13.x
```

Use `uninstall` or `rm` to remove an installed version from your system.

`rm` resolves against versions already on your machine — it does not consult
the remote version map. See
[Version Syntax](/reference/install-zig/#version-syntax) for the full list of
accepted forms.
