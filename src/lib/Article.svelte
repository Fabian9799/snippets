<script lang="ts">
	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		search?: boolean;
	}

	let { slug, title, description, tags, search = false }: Props = $props();
</script>

<a href="/snippet/{slug}" class="inline-block w-full rounded-xl h-full">
	<div
		class="border duration-200 group border-zinc-800 hover:border-rose-600 h-full flex flex-col p-5 rounded-xl shadow hover:bg-gradient-to-r hover:from-rose-900/50 hover:ring-2 ring-rose-600"
	>
		<h2
			class="font-semibold text-xl"
			style="view-transition-name: snippet-{slug}-title"
		>
			{title}
		</h2>
		<p
			class="text-zinc-300 flex-1"
			style="view-transition-name: snippet-{slug}-description"
			class:mb-8={!search}
		>
			{description}
		</p>
		<div class="flex gap-2 flex-wrap">
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each tags as tag}
				<p
					class="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-zinc-200"
				>
					#{tag}
				</p>
			{/each}
		</div>
	</div>
</a>
