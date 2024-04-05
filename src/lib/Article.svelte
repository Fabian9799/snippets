<script lang="ts">
	export let slug: string;
	export let title: string;
	export let description: string;
	export let tags: string[];
</script>

<a href={slug} class="inline-block w-full rounded-md">
	<div
		class="border border-zinc-800 p-4 rounded-md shadow hover:bg-gradient-to-r hover:from-rose-900/50 hover:ring ring-rose-600"
	>
		<h2 class="font-semibold">{title}</h2>
		<p class="text-zinc-300">{description}</p>
		<div class="flex gap-2">
			{#each tags as tag}
				<p class="text-xs text-zinc-500 uppercase tracking-wider">#{tag}</p>
			{/each}
		</div>
	</div>
</a>
