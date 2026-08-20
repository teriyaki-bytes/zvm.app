---
title: Supported Platforms
description: A list of platforms ZVM can run on.
---

ZVM is developed for a wide range of operating systems and architectures.

## Architecture

- amd64
- arm64
- loong64 (Linux)
- ppc64le (Linux)

## Operating System

- Windows
- Linux
- Darwin (macOS)
- FreeBSD
- NetBSD
- OpenBSD
- Solaris

## Notes

FreeBSD's `ErrUnsupportedSystem` regression was fixed in v0.8.18
([issue #77](https://github.com/tristanisham/zvm/issues/77),
[PR #159](https://github.com/tristanisham/zvm/pull/159)).

For OS and architecture combinations where upstream Zig does not ship a
prebuilt binary, you can override what ZVM downloads with `--target-os` and
`--target-arch` (or the matching `ZVM_TARGET_OS` / `ZVM_TARGET_ARCH`
environment variables). See
[Cross-target installs](/reference/install-zig/#cross-target-installs).
