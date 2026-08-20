---
title: Use ZVM with AI Agents
description: Install ZVM's Claude Code plugin for repository-aware Zig version management.
---

ZVM ships a Claude Code plugin that teaches coding agents to use ZVM's current
command surface and find the Zig version a repository declares.

```text
/plugin marketplace add tristanisham/zvm
/plugin install zvm
```

The plugin recognizes `//! zvm-lock:` directives in `build.zig` and
`.minimum_zig_version` in `build.zig.zon`. It guides agents to prefer `zvm run`
for repository commands so they do not change your globally selected Zig
version unless you ask them to.

Its command reference is generated from ZVM's CLI definition, keeping the
plugin aligned with the installed binary.
