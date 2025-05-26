<script lang="ts">
	import { page } from '$app/state';
	import { Dialog, Separator } from 'bits-ui';
	import Article from './Article.svelte';

	type Snippet = {
		text: string;
		slug: string;
		tags: string[];
		title: string;
		description: string;
	};

	const snippets = page.data.snippets as Snippet[];
	const formattedSnippets = snippets.map((snippet) => {
		return {
			text: `${snippet.title} ${snippet.description} ${snippet.tags.join(' ')}`,
			slug: snippet.slug,
			tags: snippet.tags,
			title: snippet.title,
			description: snippet.description,
		};
	});

	let searchTerm = $state('');

	let filteredSnippets = $derived(
		formattedSnippets.filter((snippet) =>
			snippet.text.toLowerCase().includes(searchTerm.toLowerCase()),
		),
	);

	let showSoos = $derived(searchTerm.toLowerCase() === 'soos');

	let open = $state(false);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === 'k' || e.key === 'K') {
				e.preventDefault();
				open = !open;
			}
		}
	}}
/>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class="inline-flex size-12 items-center
    justify-center rounded-md hover:text-rose-500 cursor-pointer"
		title="Ctrl + K to open Search"
	>
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
			><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
		>
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl outline-none sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-2xl mb-4 font-semibold tracking-tight"
				>Search</Dialog.Title
			>
			<Separator.Root class="-mx-5 mb-6 block h-px bg-zinc-800" />

			<div class="flex flex-col items-start gap-4">
				<div class="relative w-full">
					<input
						id="apiKey"
						class="bg-zinc-800 border border-zinc-700 w-full px-4 py-2 rounded-xl"
						placeholder="Search..."
						type="text"
						autocomplete="off"
						bind:value={searchTerm}
					/>

					{#if showSoos}
						<p class="mt-2">Hello I'm Soos! How can I help you?</p>
						<img
							class="absolute animate-spin -top-8 right-0 w-32"
							src="/soos.svg"
							alt="Soos"
						/>
					{/if}
				</div>
				<div
					class="flex flex-col w-full gap-2 max-h-96 overflow-y-auto p-1"
					style="scrollbar-width: thin;"
				>
					{#if searchTerm !== ''}
						{#if filteredSnippets.length > 0}
							<!-- eslint-disable-next-line svelte/require-each-key -->
							{#each filteredSnippets as { description, slug, tags, title }}
								<div class="w-full">
									<Article
										{slug}
										{title}
										{description}
										{tags}
										search={true}
									/>
								</div>
							{/each}
						{:else}
							<p>No snippets found</p>
						{/if}
					{/if}
				</div>
			</div>

			<Dialog.Close
				class="absolute right-5 top-5 rounded-md focus-visible:outline-none cursor-pointer focus-visible:ring-2 active:scale-98 hover:text-rose-500"
			>
				<div>
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
						><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
