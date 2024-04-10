<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Separator, Label } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import Article from './Article.svelte';

	type Snippet = {
		text: string;
		slug: string;
		tags: string[];
		title: string;
		description: string;
	};

	const snippets = $page.data.snippets as Snippet[];
	const formattedSnippets = snippets.map((snippet) => {
		return {
			text: `${snippet.title} ${snippet.description} ${snippet.tags.join(' ')}`,
			slug: snippet.slug,
			tags: snippet.tags,
			title: snippet.title,
			description: snippet.description
		};
	});

	let searchTerm = '';

	$: filteredSnippets = formattedSnippets.filter((snippet) =>
		snippet.text.toLowerCase().includes(searchTerm.toLowerCase())
	);

	$: {
		// rainbow easter egg
		if (searchTerm.toLowerCase() === 'rainbow') {
			const main = document.getElementsByTagName('main')[0];
			main.style.backgroundImage = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTMwIiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJTb3VyY2VHcmFwaGljIiBlZGdlTW9kZT0ibm9uZSIgcmVzdWx0PSJibHVyIj48L2ZlR2F1c3NpYW5CbHVyPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+PGVsbGlwc2Ugcng9IjE1MCIgcnk9IjE1MCIgY3g9IjU3MS4zNzU3MjgyNjc2NDk3IiBjeT0iMTUyLjIxMzQwNjc4NzQ5MjkiIGZpbGw9ImhzbCgzNywgOTklLCA2NyUpIj48L2VsbGlwc2U+PGVsbGlwc2Ugcng9IjE1MCIgcnk9IjE1MCIgY3g9IjQ3MC4zMzE4NTA4NjA3NTU2IiBjeT0iNTc4Ljk2ODE0MDEyNzc3MTEiIGZpbGw9ImhzbCgzMTYsIDczJSwgNTIlKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIxNTAiIHJ5PSIxNTAiIGN4PSIyNTYuMzQyNjg4NTE1NTQ4MyIgY3k9IjI3My4xNzcxMzIyNTE5OTkxIiBmaWxsPSJoc2woMTg1LCAxMDAlLCA1NyUpIj48L2VsbGlwc2U+PC9nPjwvc3ZnPg==")`;
			main.style.backgroundRepeat = 'no-repeat';
			main.style.backgroundPosition = 'center';
			main.style.backgroundSize = 'cover';
		}
	}

	let open = false;
</script>

<svelte:window
	on:keydown={(e) => {
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
    justify-center rounded-md"
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
			stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
		>
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/80"
		/>
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
				</div>
				<div class="flex flex-col w-full gap-2 max-h-96 overflow-y-auto p-1">
					{#if searchTerm !== ''}
						{#if filteredSnippets.length > 0}
							{#each filteredSnippets as { description, slug, tags, text, title }}
								<div class="w-full">
									<Article {slug} {title} {description} {tags} search={true} />
								</div>
							{/each}
						{:else}
							<p>No snippets found</p>
						{/if}
					{/if}
				</div>
			</div>

			<Dialog.Close
				class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
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
						stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
