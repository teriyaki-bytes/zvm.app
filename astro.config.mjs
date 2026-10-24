import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://www.zvm.app",
  // Pages stay prerendered; only /api/chat runs as a Netlify Function.
  adapter: netlify(),
  integrations: [
    starlight({
      plugins: [starlightBlog()],
      title: "zvm | Zig Version Manager",
      customCss: [
        "@fontsource-variable/unbounded",
        "@fontsource-variable/atkinson-hyperlegible-next",
        "@fontsource-variable/jetbrains-mono",
        "./src/styles/theme.css",
      ],
      social: [
        {
          icon: "github",
          label: "Source Code",
          href: "https://github.com/tristanisham/zvm",
        },
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://x.com/atalocke",
        },
      ],

      logo: {
        src: "./src/assets/zvm-logo.png",
        alt: "ZVM",
        replacesTitle: true,
      },
      favicon: "/favicon.png",
      head: [
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Install ZVM", link: "/guides/install-zvm/" },
            {
              label: "Use ZLS with ZVM in VSCode",
              link: "/guides/setup-zls-in-vscode-with-zvm",
            },
          ],
        },
        {
          label: "How To",
          items: [{ autogenerate: { directory: "reference" } }],
        },
      ],
      components: {
        Head: "./src/layouts/PostHogLayout.astro",
        Footer: "./src/components/PreviewFooter.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
      },
    }),
  ],
});
