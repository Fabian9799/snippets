<script lang="ts">
	let { data } = $props();
</script>

<main class="p-8 max-w-2xl lg:max-w-4xl mx-auto">
	<div class="flex gap-2 mb-4">
		<button
			aria-label="Back"
			onclick={() => window.history.back()}
			class="uppercase h-min rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest p-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200 my-auto"
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
		<p class="text-3xl font-bold my-auto">Tags</p>
	</div>
	<ul class="flex flex-wrap gap-4">
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each data.tags as tag}
			<li>
				<a
					href="/tags/{tag}"
					class="uppercase rounded-full hover:ring-3 ring-rose-600 font-semibold tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
					>#{tag}</a
				>
			</li>
		{/each}
	</ul>
</main>
