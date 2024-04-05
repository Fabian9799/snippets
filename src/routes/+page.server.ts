import { listSnippets } from '$lib/snippets';

export function load() {
	const snippets = listSnippets();

	return {
		snippets
	};
}
