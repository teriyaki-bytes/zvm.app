---
title: Changelog v0.7.1
date: 2024-05-27
---

Hello, and welcome to the blog! This is the first Changelong posted to the website. Typically they'll be short, mostly containing text from [GitHub Releases](https://github.com/tristanisham/zvm/releases/tag/v0.7.1), but with some of my additional thoughts and reasoning thrown in. Today ZVM enters it's 0.7 series. This minor version cycle, I'll be focusing on improving the foundations of ZVM in order to bring a hopefully exciting (and secret) feature in v0.8.

## What changed?

### Sync
The sync command has been retired as of ZVM v0.7.0. With v0.7.1, its functionality has been moved to the `use` command. Just run `zvm use --sync` to sync your local version of Zig with your project. 

### VMU
The `--vmu` flag has been upgraded to a command. It still works the same way, but now it's just easier to access.

### Upgrade

ZVM will now automatically check for upgrades after you've ran a command. This just consists of a ping to ZVM's GitHub repo using GitHub's public API. Many tools including NPM and Deno do this automatically. If you would like to disable this functionality, you can set the new `ZVM_SET_CU` environment variable to *anything*. If you'd like to reenable it, just `unset ZVM_SET_CU`.

As always, if you have any questions, feedback, or want to help ZVM out, you can create an [issue](https://github.com/tristanisham/zvm/issues) on our GitHub, or support free and open source software for less than the price of a cup of coffee on [Polar.sh](https://polar.sh/tristanisham)