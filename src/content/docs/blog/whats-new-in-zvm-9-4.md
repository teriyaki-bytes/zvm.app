---
title: What's new in ZVM 9.4
author: Tristan Isham
description: "Explore ZVM 9.4: a settings editor, install deduplication, per-shell Zig versions, automatic switching, a Go ZON parser, and security updates."
date: 2026-10-24T12:00:00-04:00
draft: false
cover:
  image: ../../../assets/zvm-9-4-blueprint.svg
  alt: A large black 9.4 on white blueprint paper with drafting grids, construction lines, and dimension marks.
---

In nine days, `zvm` will be four years old. In four years, it has grown from a simple version manager for Zig into a comprehensive Zig workplace manager. I can't imagine how anyone develops in the language without it. The ease of installation, setting up and switching between Zig and its dependencies without a thought, and its first-in-class agent support means that if you're writing Zig, you should be doing it with `zvm`.

<a class="py-2" style="display: block; padding-block: 0.5rem;" href="https://github.com/tristanisham/zvm/stargazers">
  <img class="dark:sl-hidden" src="/images/zvm-star-history-2026-10-24-light.svg" alt="ZVM GitHub star history, reaching 1,077 stars." width="800" height="400" loading="lazy" />
  <img class="light:sl-hidden" src="/images/zvm-star-history-2026-10-24-dark.svg" alt="ZVM GitHub star history, reaching 1,077 stars." width="800" height="400" loading="lazy" />
</a>

If you don't believe me, just look at the graph. Almost 1,100 developers have starred `zvm`. And today, I'm hoping its latest update carries us over that milestone.

`zvm` 9.4 ships with a [built-in settings editor with jq-like syntax support](https://zvm.app/reference/configuring-settings/), a [100% Go ZON parser](https://github.com/tristanisham/zon), [install deduplication](https://www.zvm.app/reference/deduplicate-versions/), [opt-in per-shell Zig versions with automatic switching on `cd`](https://www.zvm.app/reference/shell-integration/), and a ton of security updates, including patching `http2shell` by requiring at least `go1.27.3`.

These are all major features that give you more flexibility in how you use `zvm`, and how `zvm` works for you.

As always, if you experience any issues with `zvm` just run `zvm bug` and file a report.
