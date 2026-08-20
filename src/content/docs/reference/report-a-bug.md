---
title: Report a Bug
description: Create a privacy-aware ZVM bug report.
---

```sh
zvm bug
```

This opens a prefilled issue on ZVM's GitHub repository. The draft includes
your ZVM version, settings, installed and selected Zig versions, and host
details. Review it, describe what happened, and submit it yourself; ZVM never
files the issue for you.

Before building the report URL, ZVM shortens paths under your home directory
to `~`. Built-in mirror and version-map URLs are shown as-is, while custom URLs
are replaced with a short SHA-256 digest. The digest is a correlation tag, not
a secret, so review the report before submitting it.

On a remote machine or anywhere without a browser, print the URL and open it
elsewhere:

```sh
zvm bug --print
```

When set, `$BROWSER` takes precedence over the platform's default URL handler.
