<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="p-8 max-w-2xl mx-auto">
	<p class="text-3xl font-bold mb-4">Snippets</p>
	<ul class="grid grid-cols-2 flex-wrap gap-2">
		{#each data.snippets as { slug, description, title, tags }}
			<li class="">
				<a href={slug}>
					<article
						class="border border-zinc-800 p-4 rounded-md shadow hover:bg-gradient-to-r hover:from-rose-900/10 hover:border-rose-800"
					>
						<h2 class="font-semibold text-xl">{title}</h2>
						<p class="text-zinc-300">{description}</p>
						<div class="flex gap-2">
							{#each tags as tag}
								<p class="text-xs text-zinc-500 uppercase tracking-wider">#{tag}</p>
							{/each}
						</div>
					</article>
				</a>
			</li>
		{/each}
	</ul>
</main>
