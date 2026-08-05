import FlexSearch from 'flexsearch';
import { type Index } from 'flexsearch';

export type Post = {
	content: string;
	slug: string;
	title: string;
	tags: string[];
};

export type Result = {
	content: string[];
	href: string;
	slug: string;
	title: string;
};

let postsIndex: Index;
let posts: Post[];

export function createPostsIndex(data: Post[]) {
	postsIndex = new FlexSearch.Index({ tokenize: 'forward' });

	data.forEach((post, i) => {
		const item = `${post.title} ${post.content}`;
		postsIndex.add(i, item);
	});

	posts = data;
}

export function searchPostsIndex(searchTerm: string) {
	if (searchTerm.startsWith('#')) {
		return searchByTag(searchTerm.slice(1));
	}

	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const results = postsIndex.search(match);

	return results
		.map((index) => posts[index as number])
		.map(({ slug, title, content }) => {
			return {
				slug,
				href: `/snippet/${slug}`,
				title: replaceTextWithMarker(title, match),
				content: getMatches(content, match),
			};
		});
}

function searchByTag(tagQuery: string) {
	const query = tagQuery.trim().toLowerCase();
	const match = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const matchingTags = [
		...new Set(
			posts
				.flatMap((post) => post.tags)
				.filter(
					(tag) => !query || tag.toLowerCase().startsWith(query),
				),
		),
	].sort((a, b) => a.localeCompare(b));

	const tagResults: Result[] = matchingTags.map((tag) => {
		const count = posts.filter((post) => post.tags.includes(tag)).length;

		return {
			slug: `tag:${tag}`,
			href: `/tags/${tag}`,
			title: query
				? `#${replaceTextWithMarker(tag, match)}`
				: `#${escapeHtml(tag)}`,
			content: [
				`${count} snippet${count === 1 ? '' : 's'} tagged with #${escapeHtml(tag)}`,
			],
		};
	});

	if (!query) {
		return tagResults;
	}

	const snippetResults: Result[] = posts
		.filter((post) =>
			post.tags.some((tag) => tag.toLowerCase().startsWith(query)),
		)
		.map(({ slug, title, tags }) => {
			const postTags = tags.filter((tag) =>
				tag.toLowerCase().startsWith(query),
			);

			return {
				slug,
				href: `/snippet/${slug}`,
				title: escapeHtml(title),
				content: [
					postTags
						.map((tag) => `#${replaceTextWithMarker(tag, match)}`)
						.join(' '),
				],
			};
		});

	return [...tagResults, ...snippetResults];
}

function escapeHtml(text: string) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function replaceTextWithMarker(text: string, match: string) {
	const regex = new RegExp(match, 'gi');
	if (!text) return '';
	return escapeHtml(text).replaceAll(regex, (m) => `<mark>${m}</mark>`);
}

function getMatches(text: string, searchTerm: string, limit = 1) {
	const regex = new RegExp(searchTerm, 'gi');
	const indexes = [];
	let matches = 0;
	let match;

	while ((match = regex.exec(text)) !== null && matches < limit) {
		indexes.push(match.index);
		matches++;
	}

	return indexes.map((index) => {
		const start = index - 20;
		const end = index + 80;
		const excerpt = text.substring(start, end).trim();
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
	});
}
