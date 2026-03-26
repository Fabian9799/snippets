import { listSnippets } from '$lib/snippets';

export const load = async () => {
	const snippets = listSnippets();

	const tagArray = [...new Set(snippets.flatMap((snippet) => snippet.tags))].sort((a, b) =>
		a.localeCompare(b)
	);

	return {
		tags: tagArray
	};
};
