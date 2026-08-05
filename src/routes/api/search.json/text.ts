import Markdoc, { type RenderableTreeNodes } from '@markdoc/markdoc';

/**
 * Converts Markdoc content to plain text, resolving all variables and frontmatter
 * @param markdocContent - The Markdoc content string
 * @param frontmatter - The frontmatter object containing variables
 * @returns Plain text string with all formatting and syntax removed
 */
export function markdocToPlainText(
	markdocContent: string,
	frontmatter: Record<string, unknown>,
): string {
	const ast = Markdoc.parse(markdocContent);

	const content = Markdoc.transform(ast, {
		variables: {
			markdoc: {
				frontmatter,
			},
		},
	});

	function extractText(node: RenderableTreeNodes): string {
		if (typeof node === 'string') {
			return node;
		}

		if (Array.isArray(node)) {
			return node
				.map(extractText)
				.filter((text) => text.length > 0)
				.join(' ');
		}

		if (node && typeof node === 'object' && 'children' in node) {
			const { children } = node;
			if (Array.isArray(children)) {
				return extractText(children);
			}
		}

		return '';
	}

	return extractText(content).trim();
}
