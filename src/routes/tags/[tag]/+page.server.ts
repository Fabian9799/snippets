export function load({ params }) {
	const modules = import.meta.glob('../../article/**/*.markdoc', {
		eager: true
	});

	const snippets = Object.entries(modules).map(([filepath, module]) => {
		const { frontmatter } = module;
		const slug = filepath.split('/+page')[0].replace(/^\./, '');

		return {
			title: frontmatter.title,
			description: frontmatter.description,
			slug,
			tags: frontmatter.tags
		};
	});

	const tag = params.tag;

	// filter by tag
	const filteredSnippets = snippets.filter((snippet) => snippet.tags.includes(tag));

	return {
		snippets: filteredSnippets,
		tag: tag
	};
}
