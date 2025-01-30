export function listSnippets() {
	const modules = import.meta.glob('../routes/snippet/**/*.markdoc', {
		eager: true
	});

	const snippets = Object.entries(modules).map(([filepath, module]) => {
		const { frontmatter } = module as { frontmatter: Record<string, string> };

		const parts = filepath.split('/+page.markdoc')[0].split('/');
		const slug = parts[parts.length - 1];

		return {
			title: frontmatter.title,
			description: frontmatter.description,
			slug,
			tags: frontmatter.tags
		};
	});

	return snippets;
}
