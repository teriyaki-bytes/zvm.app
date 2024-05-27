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
			social: {
				github: 'https://github.com/tristanisham/zvm',
				twitter: 'https://twitter.com/atalocke',
				
			},
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
					],
				},
				{
					label: 'How To',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
