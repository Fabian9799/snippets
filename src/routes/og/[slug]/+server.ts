export const prerender = true;

import Image from './Og.svelte';
import { componentToPng } from '$lib/renderImage';
import { listSnippets } from '$lib/snippets';

const snippets = listSnippets();

export const GET = async ({ params }) => {
	const width = 1200;
	const height = 600;
	const sanitizedSlug = params.slug.replace(/\.png$/, '');
	const snippet = snippets.find((snippet) => snippet.slug === sanitizedSlug);

	return componentToPng(
		Image,
		{ title: snippet?.title, description: snippet?.description },
		height,
		width
	);
};

export const entries = () => {
	const slugArray = snippets.map((snippet) => {
		return { slug: `${snippet.slug}.png` };
	});

	return slugArray;
};
