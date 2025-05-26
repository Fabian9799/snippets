<script lang="ts">
	import Article from '$lib/Article.svelte';
	import Search from '$lib/Search.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Snippets</title>
	<meta property="og:site_name" content="Snippets" />
	<meta property="og:title" content="Useful Snippets" />
	<meta property="og:type" content="website" />
	<meta
		property="og:url"
		content="https://snippets.fabian9799.cloud/favicon.png"
	/>
	<meta name="description" content="A list of some useful snippets" />
	<meta name="twitter:description" content="A list of some useful snippets" />
	<meta property="og:description" content="A list of some useful snippets" />
	<meta
		property="og:image"
		content="https://snippets.fabian9799.cloud/favicon.png"
	/>
	<meta
		name="twitter:image"
		content="https://snippets.fabian9799.cloud/favicon.png"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image:alt" content="A list of some useful snippets" />
	<meta name="twitter:image:alt" content="A list of some useful snippets" />
</svelte:head>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<div class="flex justify-between mb-4">
		<div class="flex gap-2 items-center">
			<p class="text-3xl flex-1 font-bold">Snippets</p>
		</div>
		<div class="flex gap-2">
			<a
				class="uppercase rounded-full hover:ring-3 ring-rose-600 text-sm h-min my-auto font-semibold tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
				href="/tags">All Tags</a
			>
			<Search />
		</div>
	</div>
	<ul class="grid sm:grid-cols-2 flex-wrap gap-4">
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each data.snippets as { slug, description, title, tags }}
			<li>
				<Article {slug} {title} {description} {tags} />
			</li>
		{/each}
	</ul>
</main>
