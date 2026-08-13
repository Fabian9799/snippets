import { z } from 'zod';

const snippetFrontmatterSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	tags: z.array(z.string().min(1)),
	publishedAt: z.preprocess(
		(value) => (value instanceof Date ? value.toISOString() : value),
		z.iso.datetime({ offset: true })
	)
});

export type SnippetMeta = z.infer<typeof snippetFrontmatterSchema> & {
	slug: string;
};

export function listSnippets(): SnippetMeta[] {
	const modules = import.meta.glob('../routes/snippet/**/*.markdoc', {
		eager: true
	});

	return Object.entries(modules).map(([filepath, module]) => {
		const parts = filepath.split('/+page.markdoc')[0].split('/');
		const slug = parts[parts.length - 1];
		const frontmatter = (module as { frontmatter: unknown }).frontmatter;
		const result = snippetFrontmatterSchema.safeParse(frontmatter);

		if (!result.success) {
			throw new Error(
				`Invalid frontmatter in src/routes/snippet/${slug}/+page.markdoc\n${z.prettifyError(result.error)}`
			);
		}

		return {
			...result.data,
			slug
		};
	});
}

export function getRelatedSnippets(
	slug: string,
	tags: string[],
	limit = 4
): SnippetMeta[] {
	const tagSet = new Set(tags);

	return listSnippets()
		.filter((snippet) => snippet.slug !== slug)
		.map((snippet) => ({
			snippet,
			score: snippet.tags.filter((tag) => tagSet.has(tag)).length
		}))
		.filter(({ score }) => score > 0)
		.sort(
			(a, b) =>
				b.score - a.score ||
				a.snippet.title.localeCompare(b.snippet.title)
		)
		.slice(0, limit)
		.map(({ snippet }) => snippet);
}

export function listTagsWithCounts() {
	const counts = new Map<string, number>();

	for (const snippet of listSnippets()) {
		for (const tag of snippet.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}

	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}
