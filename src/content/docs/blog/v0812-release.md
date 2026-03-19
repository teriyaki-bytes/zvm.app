---
title: v0.8.12 Release
date: 2026-01-22
draft: false
---

Today I'm publishing v0.8.12 of ZVM. I want to thank
[Vladimir Petrigo](https://github.com/vpetrigo),
[Jack Parsons](https://github.com/jackparsonss), and
[David James](https://github.com/xpe).

Vladimir is the latest in a long line of contributors to tackle the evergreen
issue of linking files on Windows.

Unlike on Linux, creating symbolic links can be a restricted action that
requires administrator permissions. In the past, to maintain behavior across
operating systems, I had implemented a self-escalating process into ZVM to force
ZVM to run as an administrator when necessary. I never knew how well it worked.

On my machine, it has never asked to escalate itself, and from the lack of
issues I've gotten, I assumed it worked decently enough for everyone on Windows.

That was until a few weeks ago when I migrated ZVM's linking code on Windows to
use
[hard links](https://learn.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions#hard-links).
Hard links do not require admin permissions, but I heard they could still be
fickle. I had no idea that they were useless in ZVM because it only links
directories. Luckily, the symlink behavior was still in place as a backup. I
come from a strong background in Linux and Unix systems. Sometimes I'm ignorant
of features in Windows. Luckily, our community is full of smart, capable
developers who are familiar with all kinds of systems. Vladimir nixed ZVM's hard
links and instead implemented junctions.

[Junctions](https://learn.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions#junctions)
are like hard links, but they are for directories. As long as you're pointing
them to directories on the same volume, you're good. That means--except for
people who have customized their ZVM installation well beyond the defaults--this
change should not affect anyone. If you are one of those people affected, please
create an issue and let me know. I want everyone to have the flexibility to use
ZVM however they please. It's your computer, and I'm grateful you let a little
bit of my code live on it.

I _hope_ this is the end of linking issues on Windows. I know it probably won't
be, but for now, please create an issues if you experience problems on Windows.

---

Jack Parsons very kindly made a
[YouTube Short tutorial](https://www.youtube.com/shorts/AF0UIWKOme8?feature=share)
on how to install ZVM. I feel bad that I changed the website right after he
published it, but every step he shows still works the same. Thank you Jack for
using ZVM and for taking the time to be creative with my project. It means a
lot.

---

David James kindly submitted an issue that brought attention to a design concern
I had never thought of before. You can read more about it on
[GitHub](https://github.com/tristanisham/zvm/issues/143).

Thank you. I want ZVM to be the best command line app you use. I want it to feel
clean, feel fast, and feel well designed. I definitely know that there are
warts. Some commands write through a logger. Others just print to `stdout`.
Maybe some of the flags don't make a ton of sense. I understand there is room to
improve, and I will be making those improvements gradually this year.

I appreciate all feedback for ZVM. Design, feature, bug, etc. It doesn't matter.
I appreciate that people use my tool regularly and like it enough to leave a
star.

If you have any questions, ideas, design thoughts, or just want to share
something cool you made, please
[create an issue](https://github.com/tristanisham/zvm/issues). I can be slow to
get to them--I did get married this year, which took up a considerable amount of
my bandwidth--but rest assured I am around and the project is fine. It has
simply reached a stage of maturity where I don't need to babysit it every day.
It's like my responsible teenage son who I trust not to burn the house down when
I'm out, and who'll use the $20 I left him to buy pizza instead of beer from his
older friends.
