export function load() {
	const modules = import.meta.glob('./article/**/*.markdoc', {
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

	return {
		snippets
	};
}
