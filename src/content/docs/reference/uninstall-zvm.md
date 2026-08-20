---
title: Uninstall ZVM
description: Remove ZVM and its installer-managed environment configuration.
---

ZVM stores its binary, installed Zig versions, aliases, and settings under
`$HOME/.zvm` on Unix-like systems and `$HOME\.zvm` on Windows. Remove the
installer-managed shell configuration before deleting that directory.

## Linux, BSD, macOS, and other Unix-like systems

The installer adds a block beginning with `# ZVM` to one shell startup file:

- Fish: `~/.config/fish/config.fish`
- Zsh: `~/.zshenv`, `~/.zprofile`, or `~/.zshrc`
- Other shells: `~/.bashrc` or `~/.profile`

Remove that entire block, including `ZVM_INSTALL` and the lines that add
`$HOME/.zvm/bin` and `$ZVM_INSTALL` to `PATH`. Then remove ZVM:

```sh
rm -rf "$HOME/.zvm"
```

Close and reopen your terminal to clear the old environment values.

## Windows PowerShell

Run this in PowerShell to remove the user-level environment entries and ZVM:

```powershell
$ZvmPaths = @(
    "$HOME\.zvm\self"
    "$HOME\.zvm\bin"
)

[Environment]::SetEnvironmentVariable(
    "ZVM_INSTALL",
    $null,
    [EnvironmentVariableTarget]::User
)

$UserPath = [Environment]::GetEnvironmentVariable(
    "Path",
    [EnvironmentVariableTarget]::User
) -split ";" | Where-Object {
    $_ -and $_.TrimEnd("\") -notin $ZvmPaths
}

[Environment]::SetEnvironmentVariable(
    "Path",
    $UserPath -join ";",
    [EnvironmentVariableTarget]::User
)

Remove-Item Env:ZVM_INSTALL -ErrorAction SilentlyContinue
$env:Path = (($env:Path -split ";") | Where-Object {
    $_ -and $_.TrimEnd("\") -notin $ZvmPaths
}) -join ";"

Remove-Item -Recurse -Force "$HOME\.zvm"
```

Restart open terminals and editors so they inherit the updated environment.
