import { listSnippets } from '$lib/snippets';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json(listSnippets());
};

export const prerender = true;
