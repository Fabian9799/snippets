<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Article from '$lib/Article.svelte';
	import { listSnippets } from '$lib/snippets';

	const suggestions = listSnippets().slice(0, 4);
	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? 'Page not found' : `Error ${page.status}`}</title>
</svelte:head>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<p class="text-rose-500 font-semibold tracking-widest uppercase text-sm">
		{page.status}
	</p>
	<h1 class="text-4xl font-bold mt-2">
		{isNotFound ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="text-zinc-400 text-xl mt-2">
		{#if isNotFound}
			That URL doesn't match a snippet or page. Search from the navbar, or
			head home.
		{:else}
			{page.error?.message ?? 'An unexpected error occurred.'}
		{/if}
	</p>
	<div class="flex flex-wrap gap-2 mt-6">
		<a
			href={resolve('/')}
			class="uppercase rounded-full hover:ring-3 ring-rose-600 text-sm font-semibold tracking-widest px-3 py-1.5 border border-zinc-700 bg-zinc-800/30 text-zinc-200 hover:border-rose-600"
			>Home</a
		>
		<a
			href={resolve('/tags')}
			class="uppercase rounded-full hover:ring-3 ring-rose-600 text-sm font-semibold tracking-widest px-3 py-1.5 border border-zinc-700 bg-zinc-800/30 text-zinc-200 hover:border-rose-600"
			>All Tags</a
		>
	</div>

	{#if isNotFound && suggestions.length > 0}
		<h2 class="text-xl font-semibold mt-10 mb-4">Some snippets to try</h2>
		<ul class="grid sm:grid-cols-2 flex-wrap gap-4">
			{#each suggestions as snippet (snippet.slug)}
				<li>
					<Article
						slug={snippet.slug}
						title={snippet.title}
						description={snippet.description}
						tags={snippet.tags}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</main>
