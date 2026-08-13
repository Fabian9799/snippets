import { listSnippets } from '$lib/snippets';
import { SITE_URL } from '$lib/constants';
import type { RequestHandler } from './$types';

export const prerender = true;

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET: RequestHandler = async () => {
	const snippets = listSnippets().sort(
		(a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
	);
	const items = snippets
		.map(
			(snippet) => `    <item>
      <title>${escapeXml(snippet.title)}</title>
      <link>${SITE_URL}/snippet/${snippet.slug}</link>
      <guid>${SITE_URL}/snippet/${snippet.slug}</guid>
      <pubDate>${new Date(snippet.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(snippet.description)}</description>
      ${snippet.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Snippets</title>
    <link>${SITE_URL}</link>
    <description>A list of some useful snippets</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
};
