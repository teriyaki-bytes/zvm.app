# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is **zvm.app** - the official documentation website for the Zig Version
Manager (ZVM). The content is based on the README from
https://github.com/tristanisham/zvm. Built with Astro and Starlight
documentation framework.

## Development Commands

`package.json` declares `pnpm` as the package manager (`packageManager`
field), and both `pnpm-lock.yaml` and `bun.lock` are checked in. Use `pnpm`
unless told otherwise:

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server at localhost:4321
pnpm run build        # Type-check (astro check) and build to ./dist/
pnpm run preview      # Preview production build locally
```

## Architecture

**Stack:** Astro 6 + Starlight 0.40 + starlight-blog plugin. Static site
generation — no backend.

**Content Structure:**

- `src/content/docs/` - All documentation pages (`.md` and `.mdx` files)
- `src/content/docs/index.mdx` - Landing page (`template: splash`, hides the
  default Starlight hero and renders custom components)
- `src/content/docs/guides/` - Installation and setup guides
- `src/content/docs/reference/` - Command reference and how-to guides
  (auto-generated in sidebar)
- `src/content/docs/blog/` - Blog posts
- `src/components/` - Custom `.astro` components (`Hero`, `InstallTabs`,
  `LogoCarousel`, `posthog`)
- `src/layouts/PostHogLayout.astro` - Overrides Starlight's `Head` to inject
  the PostHog analytics snippet on every page
- `src/assets/` - Images and static assets

**Configuration:**

- `astro.config.mjs` - Site config, sidebar navigation, integrations, and the
  `components.Head` override that wires in analytics
- `src/content.config.ts` - Content collection schema (docs collection extends
  the blog schema)

**Key Behaviors:**

- The "How To" sidebar section auto-generates from files in the `reference/`
  directory; guides are listed explicitly in `astro.config.mjs`
- `src/pages/install.[ext].ts` is a build-time dynamic route that proxies the
  install scripts (`install.sh`, `install.ps1`, `install.ts`) from the
  `tristanisham/zvm` GitHub repo, so `zvm.app/install.sh` mirrors the source
  repo. `getStaticPaths` fixes the set of extensions.
- Content mirrors the ZVM README from https://github.com/tristanisham/zvm —
  keep command reference docs in sync with upstream
- Build command includes TypeScript type checking (`astro check`)
