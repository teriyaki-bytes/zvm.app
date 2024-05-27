import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'zvm (Zig Version Manager)',
			social: {
				github: 'https://github.com/tristanisham/zvm',
				twitter: 'https://twitter.com/atalocke',
				
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
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
