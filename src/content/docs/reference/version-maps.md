---
title: Version Maps
description: How to configure custom version map sources and mirror servers for ZVM.
---

## Set Version Map Source

ZVM lets you choose your vendor for Zig and ZLS. This is great if your company hosts
its own internal fork of Zig, or if you prefer a different flavor of the language
like [Mach](https://machengine.org/).

```sh
zvm vmu zig "https://machengine.org/zig/index.json" # Change the source ZVM pulls Zig release information from.

zvm vmu zls https://validurl.local/vmu.json
                                       # ZVM only supports schemas that match the official version map schema.
                                       # Run `vmu default` to reset your version map.

zvm vmu zig default # Resets back to default Zig releases.
zvm vmu zig mach # Sets ZVM to pull from Mach nominated Zig.

zvm vmu zls default # Resets back to default ZLS releases.
```

## Use a Custom Mirror Distribution Server

ZVM now lets you set your own Mirror Distribution Server. If you cannot or choose not to use the official Zig mirror list, you can host your own, or use another grouping of mirrors.

```sh
zvm mirrorlist <url>
# Reset to the official mirror
zvm mirrorlist default
```
