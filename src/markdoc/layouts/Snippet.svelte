<script lang="ts">
	import { page } from '$app/stores';
	import { type Snippet } from 'svelte';

	interface Props {
		title: string;
		tags?: string[];
		description: string;
		children?: Snippet;
	}

	let { title, tags = [], description, children }: Props = $props();
	let slug = $derived($page.url.pathname.split('/').pop());
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
	<article class="max-w-2xl lg:max-w-4xl mx-auto py-8 px-4">
		<div class="flex gap-2">
			<a
				aria-label="Home"
				href="/"
				class="uppercase rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest p-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
			>
				<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
					><rect width="256" height="256" fill="none" /><path
						class="fill-current"
						d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"
					/></svg
				>
			</a>
			{#each tags as tag}
				<a
					href="/tags/{tag}"
					class="uppercase rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
					>#{tag}</a
				>
			{/each}
		</div>
		<h1
			class="font-extrabold text-4xl mt-4 mb-2"
			style="view-transition-name: snippet-{slug}-title"
		>
			{title}
		</h1>
		<p class="text-zinc-400 text-xl" style="view-transition-name: snippet-{slug}-description">
			{description}
		</p>
		<div class="prose-invert prose py-4 prose-rose max-w-none">
			{@render children?.()}
		</div>
	</article>
</main>
