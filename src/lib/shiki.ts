import { getHighlighter } from 'shiki';

// `getHighlighter` is async, it initializes the internal and
// loads the themes and languages specified.
export const highlighter = await getHighlighter({
	themes: ['night-owl'],
	langs: ['svelte']
});
