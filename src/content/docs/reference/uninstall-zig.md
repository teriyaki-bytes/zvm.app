---
title: Uninstall Zig
description: How to uninstall Zig versions using ZVM.
---

<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/uninstall-zig.webp" aria-label="Terminal recording: zvm rm removes Zig 0.13.0 and frees its space in the dedupe store">
    <source src="/videos/uninstall-zig.webm" type="video/webm" />
    <source src="/videos/uninstall-zig.mp4" type="video/mp4" />
  </video>
</figure>

```sh
# Examples
zvm rm 0.10.0      # remove an exact version
zvm rm .13         # shorthand; resolves to an installed 0.13.x
zvm rm stable      # alias; removes the installed stable release
```

Use `uninstall` or `rm` to remove an installed version from your system.

`rm` resolves against versions already on your machine — it does not consult
the remote version map. See
[Version Syntax](/reference/install-zig/#version-syntax) for the full list of
accepted forms.

Uninstalling also prunes files in the deduplication store that no installation
references. Linked local builds are protected: remove the link yourself
instead of using `zvm rm`.
