import { getHighlighter } from 'shiki/bundle/web';

// `getHighlighter` is async, it initializes the internal and
// loads the themes and languages specified.
export const highlighter = await getHighlighter({
	themes: ['dracula'],
	langs: ['svelte', 'json']
});
