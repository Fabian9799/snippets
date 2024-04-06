<script lang="ts">
	import type { PageData } from './$types';
	import Article from '$lib/Article.svelte';

	export let data: PageData;
</script>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<p class="text-3xl font-bold mb-4">
		Snippets for <span class="uppercase text-zinc-400">#{data.tag}</span>
	</p>
	<ul class="grid sm:grid-cols-2 flex-wrap gap-2">
		{#each data.snippets as { slug, description, title, tags }}
			<li>
				<Article {slug} {title} {description} {tags} />
			</li>
		{/each}
	</ul>
</main>
