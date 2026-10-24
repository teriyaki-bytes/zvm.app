---
title: Configuring Settings
description: How to configure ZVM settings, environment variables, and option flags.
---

ZVM v0.9.4 stores settings in `~/.zvm/settings.json`, or
`$ZVM_PATH/settings.json` when you set a custom directory. Use `zvm settings`
to edit them, or change the JSON file directly. ZVM creates the file if it
does not exist.

## View and edit settings

```sh
zvm settings                         # open the interactive editor
zvm settings .                       # print all settings as JSON
zvm settings .useColor                # print one value
zvm settings --raw-output .mirrorListUrl  # print a string without JSON quotes
zvm settings -r .mirrorListUrl        # short form
zvm settings .useColor false          # validate and save a value
zvm settings .autoDedupe true         # deduplicate future Zig installs
zvm settings --check                 # exit nonzero if the file has invalid entries
```

In the editor, move with the arrow keys or `j`/`k`, edit with `Enter` or `i`,
and toggle booleans with `Space`. Press `r` to reset a value, `w` or `Ctrl+S`
to save, and `q` to quit. Vim commands `:w`, `:q`, `:wq`, and `:q!` also work.
Quitting with unsaved changes asks for confirmation.

Without a terminal, `zvm settings` prints JSON. On Plan 9, it always prints
JSON because the interactive editor is unavailable.

Paths use jq-style dot notation, such as `.useColor`, `."useColor"`, or
`.["useColor"]`. Quote paths as needed for your shell:

```sh
zvm settings '.["useColor"]' false
```

Settings are flat: nested paths and jq filters are unsupported. Values are
validated before saving. If the file contains malformed JSON, invalid values,
or unknown keys, ZVM reports the problems and uses defaults for affected
settings. It leaves the file untouched until you save; saving removes unknown
keys.

## Available settings

| Key | Default | Purpose |
| --- | --- | --- |
| `mirrorListUrl` | `https://ziglang.org/download/community-mirrors.txt` | Community mirror list; `disabled` downloads directly from Zig. |
| `minisignPubKey` | Zig's signing key | Verify official Zig downloads. |
| `versionMapUrl` | `https://ziglang.org/download/index.json` | Zig release index. |
| `zlsVersionMapUrl` | `https://releases.zigtools.org/` | ZLS release API. |
| `useColor` | `true` | Colored terminal output. |
| `alwaysForceInstall` | `false` | Reinstall versions already installed. |
| `alwaysInstallZLS` | `false` | Continue a requested ZLS installation even if Zig installation fails. |
| `autoDedupe` | `false` | [Deduplicate](/reference/deduplicate-versions/) newly installed Zig versions. |

`alwaysInstallZLS` does not replace the `--zls` install flag. Commands such as
`zvm vmu`, `zvm mirrorlist`, and `zvm --color on` update these same settings.

## Environment Variables

- `ZVM_DEBUG` enables DEBUG logging for your executable. This is meant for
  contributors and developers.
- `ZVM_SET_CU` Toggle the automatic upgrade checker. If you want to reenable the
  checker, just `unset ZVM_SET_CU`.
- `ZVM_PATH` sets ZVM's data directory instead of `~/.zvm`. For example, set it
  to `$XDG_DATA_HOME/zvm` and use `$ZVM_PATH/bin` on your `PATH`.
- `ZVM_INSTALL` records the ZVM executable directory for self-upgrades. The
  installer sets it to `~/.zvm/self`; keep that directory on your `PATH`.
- `ZVM_SKIP_TLS_VERIFY` Do you have problems using TLS in your environment?
  Toggle off verifying TLS by setting this environment variable.
  - By default when this is enabled ZVM will print a warning. Set this variable
    to `no-warn` to silence this warning.
  - Official Zig archives still require a valid Minisign signature. Version
    indexes still use verified TLS. ZLS archives rely on SHA-256 checksums;
    combining this variable with `--skip-shasum` removes that protection.
- `ZVM_TARGET_OS` overrides the OS ZVM downloads binaries for. Equivalent to
  the `--target-os` flag. Case-insensitive; accepts Go-style (`linux`,
  `darwin`) or Zig-style (`linux`, `macos`) names. See
  [Cross-target installs](/reference/install-zig/#cross-target-installs).
- `ZVM_TARGET_ARCH` overrides the CPU architecture ZVM downloads binaries
  for. Equivalent to `--target-arch`. Case-insensitive; accepts `amd64` /
  `x86_64` and `arm64` / `aarch64`.
- `ZVM_HTTP_TIMEOUT` sets the HTTP timeout in seconds. Equivalent to the
  `--http.timeout` install flag.
- `ZVM_MULTISHELL_PATH` is set by [shell setup](/reference/shell-integration/)
  to the current shell's Zig link. While set, `zvm use` changes that shell's
  selection unless you pass `--global`.
- `ZVM_MULTISHELL_DIR` overrides the directory for per-shell links. It must be
  an absolute path outside the ZVM data directory.
- `BROWSER` selects the command used by `zvm bug` to open a report URL.

## Option Flags

### Color Toggle

Enable or disable colored ZVM output. No value toggles colors.

#### Enable

- on
- yes/y
- enabled
- true

#### Disabled

- off
- no/n
- disabled
- false

```sh
zvm --color on
zvm --color off
zvm --color          # toggle the saved preference
```
