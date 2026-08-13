<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Article from '$lib/Article.svelte';

	let { data } = $props();

	function goBack() {
		const navigation =
			'navigation' in window
				? (
						window as Window & {
							navigation: { canGoBack: boolean };
						}
					).navigation
				: undefined;

		if (navigation?.canGoBack ?? history.length > 1) {
			history.back();
		} else {
			goto(resolve('/'));
		}
	}
</script>

<svelte:head>
	<title>Snippets for #{data.tag.toUpperCase()}</title>
</svelte:head>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<div class="flex gap-2 min-w-0 mb-4">
		<button
			aria-label="Back"
			onclick={goBack}
			class="uppercase h-min rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest p-1 cursor-pointer border border-zinc-700 bg-zinc-800/30 text-zinc-200 my-auto"
		>
			<svg
				class="size-6"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
				><rect width="256" height="256" fill="none" /><polyline
					points="160 208 80 128 160 48"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="30"
				/></svg
			>
		</button>
		<p class="text-3xl font-bold my-auto">
			Snippets for <span class="uppercase text-rose-500">#{data.tag}</span>
		</p>
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
