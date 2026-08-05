<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { createPostsIndex, searchPostsIndex, type Result } from './search';
	import type { SnippetSearchData } from '../../routes/api/search.json/+server';

	let search = $state<'loading' | 'ready'>('loading');
	let searchTerm = $state('');
	let searchInput = $state<HTMLInputElement>();

	const results = $derived<Result[]>(
		search === 'ready' ? searchPostsIndex(searchTerm) : [],
	);

	onMount(() => {
		tick().then(() => searchInput?.focus());

		async function initializeSearch() {
			const posts = (await fetch('/api/search.json').then((res) =>
				res.json(),
			)) as SnippetSearchData[];
			createPostsIndex(posts);
			search = 'ready';
		}

		initializeSearch();
	});
</script>

<div class="w-full">
	<div class="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-6 pointer-events-none"
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
		<input
			readonly={search === 'loading'}
			bind:this={searchInput}
			bind:value={searchTerm}
			placeholder={search === 'loading'
				? 'Preparing data... Please wait.'
				: 'Search for snippets or #tags'}
			autocomplete="off"
			spellcheck="false"
			type="search"
			class="w-full pl-14 pr-5 py-4 text-xl rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-400 outline-none hover:border-rose-600 focus:border-rose-600 focus:ring-2 focus:ring-rose-600 transition"
		/>
	</div>

	{#if searchTerm}
		<div
			class="max-h-[58vh] overflow-y-auto mt-3 px-1 pb-1"
			style="scrollbar-width: thin;"
		>
			{#if results.length > 0}
				<ul class="flex flex-col gap-3 list-none m-0 p-0 pt-1">
					{#each results as result (result.slug)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a
								href={result.href}
								class="inline-block w-full rounded-xl"
							>
								<div
									class="border duration-200 group border-zinc-800 hover:border-rose-600 flex flex-col p-5 rounded-xl shadow hover:bg-linear-to-r hover:from-rose-600/30 hover:ring-2 ring-rose-600 [&_mark]:rounded-sm [&_mark]:bg-rose-600 [&_mark]:text-white"
								>
									<h2 class="font-semibold text-xl">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html result.title}
									</h2>
									{#if result.content.length > 0}
										<p class="text-zinc-300 mt-1">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html result.content.join('')}
										</p>
									{/if}
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="text-center space-y-2 py-10">
					<p class="text-xl font-semibold">No snippets found</p>
					<p class="text-zinc-400">
						No results found for "{searchTerm}".
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
