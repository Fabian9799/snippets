import adapter from '@sveltejs/adapter-static';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { markdoc } from 'svelte-markdoc-preprocess';

function absoulute(path) {
	return join(dirname(fileURLToPath(import.meta.url)), path);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess({}),
		markdoc({
			generateSchema: true,
			nodes: absoulute('./src/markdoc/nodes/_Module.svelte'),
			tags: absoulute('./src/markdoc/tags/_Module.svelte'),
			partials: absoulute('./src/lib/partials'),
			layouts: {
				default: absoulute('./src/markdoc/layouts/Snippet.svelte'),

			}
		})
	],
	extensions: ['.markdoc', '.svelte'],
	kit: {
		adapter: adapter(),

	},
	vitePlugin: {
		inspector: {
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right',
		}
	}
};

export default config;
