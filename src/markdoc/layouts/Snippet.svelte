<script lang="ts">
	export let tags: string[] = [];
</script>

<main>
	<article class="max-w-2xl mx-auto py-8 px-4">
		<div class="flex gap-2">
			{#each tags as tag}
				<a
					href="/tags/{tag}"
					class="uppercase text-xs tracking-wider px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
					>#{tag}</a
				>
			{/each}
		</div>
		<div class="prose-invert prose py-4 prose-rose max-w-none">
			<slot />
		</div>
	</article>
</main>
