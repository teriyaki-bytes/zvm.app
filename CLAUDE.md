# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is **zvm.app** - the official documentation website for the Zig Version
Manager (ZVM). The content is based on the README from
https://github.com/tristanisham/zvm. Built with Astro and Starlight
documentation framework.

## Development Commands

This project uses **bun**:

```bash
bun install          # Install dependencies
bun run dev          # Start dev server at localhost:4321
bun run build        # Type-check and build to ./dist/
bun run preview      # Preview production build locally
```

## Architecture

**Stack:** Astro + Starlight + starlight-blog plugin

**Content Structure:**

- `src/content/docs/` - All documentation pages (`.md` and `.mdx` files)
- `src/content/docs/guides/` - Installation and setup guides
- `src/content/docs/reference/` - Command reference and how-to guides
  (auto-generated in sidebar)
- `src/content/docs/blog/` - Blog posts
- `src/assets/` - Images and static assets

**Configuration:**

- `astro.config.mjs` - Site configuration, sidebar navigation, integrations
- `src/content/config.ts` - Content collection schemas

**Key Behaviors:**

- The "How To" sidebar section auto-generates from files in `reference/`
  directory
- Build command includes TypeScript type checking (`astro check`)
- Static site generation - no backend
