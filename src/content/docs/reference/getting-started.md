---
title: Getting Started
description: ZVM is a command line tool for downloading and managing version of the Zig Programming Language
---

Zig Version Manager (zvm) is a tool for managing your Zig installs. With std
under heavy development and a large feature roadmap, Zig is bound to continue
changing. Breaking existing builds, updating valid sytax, and introducing new
features like a package manager. While this is great for developers, it also can
lead to headaches when you need multiple versions of a language installed to
compile your projects, or a language gets updated frequently.

## Why Should I Use ZVM?

While Zig is still pre-1.0 if you're going to stay up-to-date with the master
branch, you're going to be downloading Zig quite often. You could do it
manually, having to scoll around to find your appropriate version, decompress
it, and install it on your `$PATH`. Or, you could install ZVM and run
`zvm i master` every time you want to update. `zvm` is a static binary under a
permissive license. It supports more platforms than any other Zig version
manager. Its only dependency is `tar` on Unix-based systems. Whether you're on
Windows, MacOS, Linux, a flavor of BSD, or Plan 9 `zvm` will let you install,
switch between, and run multiple versions of Zig.