<script lang="ts">
	export let slug: string;
	export let title: string;
	export let description: string;
	export let tags: string[];
	export let search = false;
</script>

<a href="/snippet/{slug}" class="inline-block w-full rounded-md h-full">
	<div
		class="border group border-zinc-800 hover:border-rose-600 h-full flex flex-col p-5 rounded-md shadow hover:bg-gradient-to-r hover:from-rose-900/50 hover:ring ring-rose-600"
	>
		<h2 class="font-semibold text-xl" style="view-transition-name: snippet-{slug}-title">
			{title}
		</h2>
		<p
			class="text-zinc-300 flex-1"
			style="view-transition-name: snippet-{slug}-description"
			class:mb-8={!search}
		>
			{description}
		</p>
		<div class="flex gap-2">
			{#each tags as tag}
				<p class="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-zinc-200">
					#{tag}
				</p>
			{/each}
		</div>
	</div>
</a>
