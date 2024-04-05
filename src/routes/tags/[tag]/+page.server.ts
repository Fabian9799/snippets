import { listSnippets } from '$lib/snippets.js';

export function load({ params }) {
	const snippets = listSnippets();

	const tag = params.tag;

	// filter by tag
	const filteredSnippets = snippets.filter((snippet) => snippet.tags.includes(tag));

	return {
		snippets: filteredSnippets,
		tag: tag
	};
}
