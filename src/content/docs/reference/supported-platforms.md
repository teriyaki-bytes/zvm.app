---
title: Supported Platforms
description: A list of platforms ZVM can run on.
---

ZVM v0.9.4's release build targets these operating systems and architectures:

| Operating system | Architectures |
| --- | --- |
| Windows | `386`, `amd64`, `arm64` |
| Linux | `386`, `amd64`, `arm64`, `loong64`, `ppc64le` |
| Darwin (macOS) | `amd64`, `arm64` |
| FreeBSD | `386`, `amd64`, `arm64` |
| NetBSD | `386`, `amd64`, `arm64` |
| OpenBSD | `386`, `amd64`, `arm64` |
| Solaris | `amd64` |
| Plan 9 | `386` |

`amd64` is also called x86_64, and `arm64` is also called aarch64. The
[release downloads](https://github.com/tristanisham/zvm/releases/latest)
contain `.zip` archives for Windows and `.tar` archives for other platforms.

## Notes

FreeBSD's `ErrUnsupportedSystem` regression was fixed in v0.8.18
([issue #77](https://github.com/tristanisham/zvm/issues/77),
[PR #159](https://github.com/tristanisham/zvm/pull/159)).

For OS and architecture combinations where upstream Zig does not ship a
prebuilt binary, you can override what ZVM downloads with `--target-os` and
`--target-arch` (or the matching `ZVM_TARGET_OS` / `ZVM_TARGET_ARCH`
environment variables). See
[Cross-target installs](/reference/install-zig/#cross-target-installs).
