import { createHighlighter } from 'shiki/bundle/web';

// `createHighlighter` is async, it initializes the internal and loads the themes and languages specified.
export const highlighter = await createHighlighter({
	themes: ['dracula'],
	langs: ['svelte', 'json', 'html', 'bash']
});
