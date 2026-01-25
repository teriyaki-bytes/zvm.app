import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	site: "https://www.zvm.app",
	integrations: [
		starlight({
			plugins: [starlightBlog()],
			title: 'zvm | Zig Version Manager',
			social: [
				{
					icon: "github",
					label: "Source Code",
					href: "https://github.com/tristanisham/zvm"
				},
				{
					icon: 'twitter',
					label: 'Twitter',
					href: 'https://x.com/atalocke'
				}
			],

			logo: {
				light: './src/assets/zvm-text-logo-light.png',
				dark: './src/assets/zvm-text-logo-dark.png',
				replacesTitle: true,
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Install ZVM', link: '/guides/install-zvm/' },
						{ label: 'Use ZLS with ZVM in VSCode', link: '/guides/setup-zls-in-vscode-with-zvm' },

					],
				},
				{
					label: 'How To',
					autogenerate: { directory: 'reference' },
				},
			],
			components: {
				Head: './src/layouts/PostHogLayout.astro',
			},
		}),
	],
});
