---
title: Install Zig
description: How to install Zig versions using ZVM.
---

<figure class="terminal-demo">
  <video autoplay loop muted playsinline preload="metadata" poster="/videos/install-master-zls.webp" aria-label="Terminal recording: zvm i master --zls downloads Zig master and a matching ZLS, verifies checksums and signatures, and installs both">
    <source src="/videos/install-master-zls.webm" type="video/webm" />
    <source src="/videos/install-master-zls.mp4" type="video/mp4" />
  </video>
</figure>

```sh
zvm install <version>
# Or
zvm i <version>
```

Use `install` or `i` to download a specific version of Zig. To install the
latest nightly, use `master`; for the latest stable tagged release, use
`stable`.

```sh
# Example
zvm i master
zvm i stable
zvm i 0.13            # shorthand — resolves to 0.13.0
zvm i .15             # shorthand — resolves to the highest 0.15.x
```

See the [Version Syntax](#version-syntax) section below for the full set of
accepted version strings. The same rules apply to `zvm use`, `zvm run`, and
`zvm rm`.

## Force Install

As of `v0.7.6` ZVM will now skip downloading a version if it is already
installed. You can always force an install with the `--force` or `-f` flag.

```sh
zvm i --force master
```

You can also enable this behavior with
`zvm settings .alwaysForceInstall true`.

## Install without switching

By default, a newly installed version becomes active. Use `--skip-use` (or
`-k`) to install Zig and any requested ZLS without changing the selection:

```sh
zvm i --skip-use --zls 0.15.2
```

## Download verification

ZVM verifies official Zig archives with Zig's Minisign signing key and checks
that the signed filename matches the requested archive. Failed mirror
downloads or verification checks trigger the next mirror, with the original
download URL as the final fallback.

After verification, ZVM records the archive's SHA-256 in
`~/.zvm/known_hashes.json` (or `$ZVM_PATH/known_hashes.json`). If that filename
later has a different hash, installation fails. `--force` does not bypass
this check. Custom version maps use their published checksums and are not
added to this store.

## Install a development build

Zig development builds can be installed by their full identifier, even though
they are not present in the release version map:

```sh
zvm i 0.16.0-dev.1334+06d08daba
```

Because these builds do not have a version-map SHA-256 checksum, ZVM warns you
and asks for confirmation. For an explicit non-interactive install, pass
`--skip-shasum` (or `-s`):

```sh
zvm i --skip-shasum 0.16.0-dev.1334+06d08daba
```

This flag skips SHA-256 verification and the unverified-download confirmation
for Zig and ZLS downloads. Official Zig archives still require valid Minisign
signatures. Use it only when you accept skipping the checksum check.

## Customize HTTP Timeout

You can pass a custom HTTP timeout (in seconds) for `zvm i` using the
`--http.timeout` flag or by setting the `ZVM_HTTP_TIMEOUT` environment
variable.

```sh
zvm i --http.timeout 30 master
```

## Bypass community mirrors

ZVM normally uses its configured mirror list. Pass `--nomirror` to download
Zig directly from `ziglang.org` for one installation:

```sh
zvm i --nomirror master
```

## Install ZLS with ZVM

You can now install ZLS with your Zig download! To install ZLS with ZVM, simply
pass the `--zls` flag with `zvm i`. For example:

```sh
zvm i --zls master
```

### Select ZLS compatibility mode

By default, ZVM will install a ZLS build, which can be used with the given Zig
version, but may not be able to build ZLS from source. If you want to use a ZLS
build, which can be built using the selected Zig version, pass the `--full` flag
with `zvm i --zls`. For example:

```sh
zvm i --zls --full master
```

**This does not apply to tagged releases, e.g.: `0.13.0`**

## Version Syntax

As of v0.8.19, the commands that take a Zig version — `install`, `use`, `run`,
and `rm` — accept several forms:

| Input     | Resolves to                                           |
| --------- | ----------------------------------------------------- |
| `0.14.1`  | `0.14.1` (exact tagged release)                       |
| `0.13`    | `0.13.0` (shorthand — highest `0.13.x`)               |
| `0.15`    | `0.15.2` (shorthand — highest `0.15.x`)               |
| `.12`     | `0.12.1` (leading dot implies `0.`)                   |
| `master`  | Zig's nightly build (passes through unchanged)        |
| `stable`  | The highest non-dev, non-master tagged release        |

For `install` and `use`, shorthand expansion prints a line such as
`Resolved "0.13" to 0.13.0`. `run` resolves shorthand without printing that
line.

**Resolution scope matters.** `install` resolves against the *remote* version
map (the Zig download index by default, or your configured
[version map](/reference/version-maps/)). `use` and `rm` resolve shorthand
against *locally installed* versions. `run` checks installed versions first,
then the remote map if no local version matches. Both `use` and `run` can
prompt to install a missing version. Install explicitly before using them in
scripts that must run without prompts.

Shorthand and aliases also propagate to the `--zls` installer, so
`zvm i --zls .13` now installs the matching ZLS build instead of failing
with an empty-version error.

You can also use a [custom alias](/reference/manage-aliases/) anywhere a
version is accepted.

To share identical files across installations, see
[Deduplicate Installed Versions](/reference/deduplicate-versions/).

## Cross-target installs

You can override the OS and architecture ZVM downloads for. This is useful
on hosts like FreeBSD where a given Zig version may have no native prebuilt
binary, but a Linux or macOS build will run under emulation or compatibility
layers.

Use the flags:

```sh
zvm i --target-os linux --target-arch x86_64 0.14.0
```

Or set environment variables so every install in the session inherits the
override:

```sh
export ZVM_TARGET_OS=linux
export ZVM_TARGET_ARCH=x86_64
zvm i 0.14.0
```

Both Go-style names (`darwin`, `amd64`, `arm64`) and Zig-style names
(`macos`, `x86_64`, `aarch64`) are accepted, and values are
case-insensitive.

## Install Mach's Zig

ZVM reads the list of available Zig builds from a version map. By default it
uses the official map from `ziglang.org`, but you can point it at another
vendor's, such as [Mach](https://machengine.org/)'s nominated Zig versions:

```sh
zvm vmu zig mach      # use Mach's version map
zvm i mach-latest     # install Mach's latest nominated Zig
zvm vmu zig default   # switch back to official releases
```

See [Version Maps](/reference/version-maps/) for custom maps, ZLS maps, and
mirror lists.
