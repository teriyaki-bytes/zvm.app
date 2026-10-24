---
title: Use ZVM with AI Agents
description: Use ZVM's shared agent skill and plugin manifests for repository-aware Zig version management.
---

ZVM v0.9.4 ships a portable `zig-versions` agent skill with plugin manifests
for Claude Code and Codex. It teaches agents ZVM's command surface and how to
find the Zig version a repository declares.

## Claude Code

```text
/plugin marketplace add tristanisham/zvm
/plugin install zvm
```

You can also install it from a shell:

```sh
claude plugin marketplace add tristanisham/zvm
claude plugin install zvm@zvm
```

## Other skill-compatible agents

The repository includes a Codex plugin manifest at
[`.codex-plugin/plugin.json`](https://github.com/tristanisham/zvm/blob/master/.codex-plugin/plugin.json).
The shared [`skills/zig-versions/`](https://github.com/tristanisham/zvm/tree/master/skills/zig-versions)
directory uses the portable Agent Skills layout, so skill-compatible agents
can load that directory directly. With the Skills CLI, install it using:

```sh
npx skills add tristanisham/zvm --skill zig-versions
```

Add `-g` to install the skill globally rather than for the current project.

## Repository version selection

The plugin recognizes `//! zvm-lock:` directives in `build.zig` and
`.minimum_zig_version` in `build.zig.zon`. It guides agents to prefer `zvm run`
for repository commands so they do not change your globally selected Zig
version unless you ask them to.

Its bundled command reference is generated from ZVM's CLI definition. Keep
your skill and ZVM installation current so their command versions match.
