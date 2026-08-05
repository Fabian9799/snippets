import Markdoc from '@markdoc/markdoc';
import { json } from '@sveltejs/kit';
import { load as loadYaml } from 'js-yaml';
import { markdocToPlainText } from './text';

export type SnippetSearchData = {
	title: string;
	slug: string;
	content: string;
	tags: string[];
};

export const prerender = true;

export const GET = async () => {
	const modules = import.meta.glob('../../snippet/**/*.markdoc', {
		eager: true,
		query: '?raw',
		import: 'default',
	});

	const mappedSnippets: SnippetSearchData[] = Object.entries(modules).map(
		([filepath, module]) => {
			const content = module as string;
			const parts = filepath.split('/+page.markdoc')[0].split('/');
			const slug = parts[parts.length - 1];

			const ast = Markdoc.parse(content);
			const frontmatter = (
				ast.attributes.frontmatter
					? loadYaml(ast.attributes.frontmatter)
					: {}
			) as {
				title: string;
				description?: string;
				tags?: string[];
			};

			const plainText = markdocToPlainText(content, frontmatter);
			const tags = frontmatter.tags ?? [];
			const description = frontmatter.description ?? '';

			return {
				title: frontmatter.title,
				slug,
				tags,
				content: `${description} ${tags.join(' ')} ${plainText}`.trim(),
			};
		},
	);

	return json(mappedSnippets, {
		headers: {
			'Cache-Control': 'public, max-age=60',
		},
	});
};
