<script lang="ts">
	import Article from '$lib/Article.svelte';
	import Search from '$lib/Search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<title>Snippets</title>

<main class="p-8 max-w-2xl mx-auto">
	<div class="flex">
		<p class="text-3xl flex-1 font-bold mb-4">Snippets</p>
		<Search />
	</div>
	<ul class="grid grid-cols-2 flex-wrap gap-2">
		{#each data.snippets as { slug, description, title, tags }}
			<li>
				<Article {slug} {title} {description} {tags} />
			</li>
		{/each}
	</ul>
</main>
