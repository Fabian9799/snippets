<script lang="ts">
	import Article from '$lib/Article.svelte';
	import Search from '$lib/Search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Snippets</title>
	<meta property="og:site_name" content="Snippets" />
	<meta property="og:title" content="Useful Snippets" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://snippets.fabian9799.cloud/favicon.png" />
	<meta name="description" content="A list of some useful snippets" />
	<meta name="twitter:description" content="A list of some useful snippets" />
	<meta property="og:description" content="A list of some useful snippets" />
	<meta property="og:image" content="https://snippets.fabian9799.cloud/favicon.png" />
	<meta name="twitter:image" content="https://snippets.fabian9799.cloud/favicon.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image:alt" content="A list of some useful snippets" />
	<meta name="twitter:image:alt" content="A list of some useful snippets" />
</svelte:head>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<div class="flex">
		<p class="text-3xl flex-1 font-bold mb-4">Snippets</p>
		<Search />
	</div>
	<ul class="grid sm:grid-cols-2 flex-wrap gap-2">
		{#each data.snippets as { slug, description, title, tags }}
			<li>
				<Article {slug} {title} {description} {tags} />
			</li>
		{/each}
	</ul>
</main>
