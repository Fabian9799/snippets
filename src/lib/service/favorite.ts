import { LOCALSTORAGE_FAVORITE_KEY } from '$lib/constants';
import { listSnippets, type SnippetMeta } from '$lib/snippets';
import { PersistedState } from 'runed';

export const favorites = new PersistedState<string[]>(
	LOCALSTORAGE_FAVORITE_KEY,
	[]
);

export function listFavoriteSnippets(): SnippetMeta[] {
	const bySlug = new Map(
		listSnippets().map((snippet) => [snippet.slug, snippet])
	);

	return favorites.current.flatMap((slug) => {
		const snippet = bySlug.get(slug);
		return snippet ? [snippet] : [];
	});
}

export function addFavorite(slug: string) {
	if (favorites.current.includes(slug)) return;
	favorites.current.push(slug);
}

export function removeFavorite(slug: string) {
	const index = favorites.current.indexOf(slug);
	if (index === -1) return;
	favorites.current.splice(index, 1);
}
