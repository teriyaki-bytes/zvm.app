---
title: Manage Version Aliases
description: Give installed Zig versions custom names with ZVM.
---

<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/manage-aliases.webp" aria-label="Terminal recording: zvm alias names 0.14.1 work, lists aliases, and runs Zig through the alias">
    <source src="/videos/manage-aliases.webm" type="video/webm" />
    <source src="/videos/manage-aliases.mp4" type="video/mp4" />
  </video>
</figure>

Use `alias` (or `kv`) to give an installed Zig version a memorable name. The
target version must already be installed; exact versions and shorthand are
accepted.

```sh
zvm alias work 0.13.0
zvm alias play .14
zvm use work
zvm run play version
```

Aliases work anywhere ZVM accepts a version, including `install`, `use`,
`run`, and `rm`. Assigning an existing name updates it.

## Inspect and remove aliases

```sh
zvm alias              # list every alias
zvm alias work         # print one alias
zvm alias --delete work
zvm alias -d work      # short form
zvm alias --clear      # delete every alias
```

ZVM stores aliases as a JSON object in `~/.zvm/aliases.json`, or in
`$ZVM_PATH/aliases.json` when you use a custom ZVM directory.
