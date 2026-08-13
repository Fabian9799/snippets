import { listSnippets } from '$lib/snippets';

export function load() {
	const snippets = listSnippets();

	snippets.sort((a, b) => {
		return (
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		);
	});

	return {
		snippets
	};
}
