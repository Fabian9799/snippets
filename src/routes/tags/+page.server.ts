import { listTagsWithCounts } from '$lib/snippets';

export const load = async () => {
	return {
		tags: listTagsWithCounts()
	};
};
