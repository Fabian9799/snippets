<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let tags: string[] = [];
	export let description: string;
	$: slug = $page.url.pathname.split('/').pop();
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:site_name" content="Snippets" /><meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://snippets.fabian9799.cloud/snippet/{slug}" /><meta
		name="description"
		content={description}
	/>
	<meta name="twitter:description" content={description} /><meta
		property="og:description"
		content={description}
	/>
	<meta property="og:image" content="https://snippets.fabian9799.cloud/og/{slug}.png" />
	<meta name="twitter:image" content="https://snippets.fabian9799.cloud/og/{slug}.png" />
	<meta name="twitter:card" content="summary_large_image" /><meta
		property="og:image:alt"
		content={description}
	/>
	<meta name="twitter:image:alt" content={description} />
</svelte:head>

<main>
	<article class="max-w-2xl mx-auto py-8 px-4">
		<div class="flex gap-2">
			{#each tags as tag}
				<a
					href="/tags/{tag}"
					class="uppercase rounded-xl hover:ring ring-rose-600 font-semibold text-xs tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
					>#{tag}</a
				>
			{/each}
		</div>
		<div class="prose-invert prose py-4 prose-rose max-w-none">
			<slot />
		</div>
	</article>
</main>
