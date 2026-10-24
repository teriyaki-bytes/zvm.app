---
title: Deduplicate Installed Versions
description: Save disk space by sharing identical files across installed Zig versions.
---

<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/home-dedupe.webp" aria-label="Terminal recording: zvm dedupe hard-links identical files across ten installed Zig versions and reclaims 924.7 MiB">
    <source src="/videos/home-dedupe.webm" type="video/webm" />
    <source src="/videos/home-dedupe.mp4" type="video/mp4" />
  </video>
</figure>

ZVM v0.9.4 can replace identical files across Zig installations with hard links
into `~/.zvm/store` (or `$ZVM_PATH/store`).

```sh
zvm dedupe                  # all installed versions
zvm dedupe 0.15.1 0.15.2    # selected versions
zvm dedupe .15              # shorthand is accepted, as are custom aliases
```

Files are shared only when their content, permissions, and owner match.
Symlinks and linked local builds are left alone, and files that cannot be
hard-linked are skipped. The command is safe to repeat or interrupt and
reports the space reclaimed.

## Deduplicate future installs

Automatic deduplication defaults to off. Enable or disable it with:

```sh
zvm dedupe --auto on
zvm dedupe --auto off
```

`--auto` saves the preference and exits. Enabling it does not process existing
installations; run `zvm dedupe` once for those. Disabling it leaves existing
hard links in place. You can also read or change the preference with
`zvm settings .autoDedupe`.

## Shared files and cleanup

Editing a shared file in place changes it in every installation that shares
it. If you patch Zig's standard library, keep that installation out of
deduplication. To restore separate files, disable automatic deduplication and
reinstall the version with `zvm install --force <version>`.

`zvm uninstall` and `zvm clean` remove store files no installation references.
To measure total disk usage without counting hard links repeatedly, run one
`du -sh ~/.zvm` over the whole directory.
