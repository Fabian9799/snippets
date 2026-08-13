<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		search?: boolean;
	}

	let { slug, title, description, tags, search = false }: Props = $props();
</script>

<article
	class="relative w-full border duration-200 group border-zinc-800 hover:border-rose-600 h-full flex flex-col p-5 rounded-xl shadow hover:bg-linear-to-r hover:from-rose-600/30 hover:ring-2 ring-rose-600"
>
	<h2
		class="pointer-events-none font-semibold text-xl"
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
		class={['pointer-events-none text-zinc-300 flex-1', !search && 'mb-8']}
		style="view-transition-name: snippet-{slug}-description"
	>
		{description}
	</p>
	<div class="pointer-events-none flex gap-2 flex-wrap">
		{#each tags as tag (tag)}
			<a
				href={resolve('/tags/[tag]', { tag })}
				class="pointer-events-auto relative z-10 text-xs text-zinc-500 uppercase tracking-wider group-hover:text-zinc-200 hover:text-rose-500"
			>
				#{tag}
			</a>
		{/each}
	</div>
</article>
