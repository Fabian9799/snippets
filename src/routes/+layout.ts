import { highlighter } from '$lib/shiki';
export const prerender = true;
export const load = async () => {
	return {
		highlighter: highlighter
	};
};
