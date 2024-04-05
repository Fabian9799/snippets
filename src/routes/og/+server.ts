export const prerender = true;

import Image from './Og.svelte';
import { componentToPng } from '$lib/renderImage';

export const GET = async ({ url }) => {
	const width = 1200;
	const height = 600;
	return componentToPng(Image, { text: url.searchParams.get('text') }, height, width);
};
