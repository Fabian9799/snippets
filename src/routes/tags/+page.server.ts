import { listSnippets } from '$lib/snippets';

export const load = async () => {
	const snippets = listSnippets();

	// get all tags
	const tags = new Set();
	for (const snippet of snippets) {
		for (const tag of snippet.tags) {
			tags.add(tag);
		}
	}

	// convert to array
	const tagArray = Array.from(tags);

	return {
		tags: tagArray
	};
};
