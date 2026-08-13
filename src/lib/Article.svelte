<script lang="ts">
	import { resolve } from '$app/paths';
	import { favorites } from '$lib/service/favorite';

	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		search?: boolean;
		size?: 'default' | 'sm';
	}

	let {
		slug,
		title,
		description,
		tags,
		search = false,
		size = 'default',
	}: Props = $props();

	let compact = $derived(size === 'sm');
	let favorited = $derived(favorites.current.includes(slug));
</script>

<article
	class={[
		'relative w-full border duration-200 group border-zinc-800 hover:border-rose-600 h-full flex flex-col rounded-xl shadow hover:bg-linear-to-r hover:from-rose-600/30 hover:ring-2 ring-rose-600',
		compact ? 'p-3' : 'p-5',
	]}
>
	<h2
		class={[
			'pointer-events-none font-semibold',
			compact ? 'text-base' : 'text-xl',
		]}
		style="view-transition-name: snippet-{slug}-title"
	>
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href="/snippet/{slug}"
			class="pointer-events-auto after:absolute after:inset-0 after:rounded-xl after:content-['']"
		>
			{title}
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</h2>
	<p
		class={[
			'pointer-events-none text-zinc-300 flex-1',
			compact ? 'text-sm mt-1' : !search && 'mb-8',
		]}
		style="view-transition-name: snippet-{slug}-description"
	>
		{description}
	</p>
	<div
		class={[
			'pointer-events-none flex gap-2 flex-wrap items-center',
			compact && 'mt-2',
		]}
	>
		{#each tags as tag (tag)}
			<a
				href={resolve('/tags/[tag]', { tag })}
				class={[
					'pointer-events-auto relative z-10 text-zinc-500 uppercase tracking-wider group-hover:text-zinc-200 hover:text-rose-500',
					compact ? 'text-[0.65rem]' : 'text-xs',
				]}
			>
				#{tag}
			</a>
		{/each}
		{#if favorited}
			<span
				class={[
					'ml-auto shrink-0 text-rose-500',
					compact ? 'size-3.5' : 'size-4',
				]}
				title="Favorited"
				aria-hidden="true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-full"
				>
					<polygon
						points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
					/>
				</svg>
			</span>
		{/if}
	</div>
</article>
