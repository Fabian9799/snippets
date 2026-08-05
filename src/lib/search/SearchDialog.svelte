<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { Dialog } from 'bits-ui';
	import Search from './Search.svelte';

	let open = $state(false);

	afterNavigate(() => {
		open = false;
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = true;
		}
	}}
/>

<Dialog.Root bind:open>
	<Dialog.Trigger
		type="button"
		class="inline-flex size-10 items-center justify-center rounded-md hover:text-rose-500 cursor-pointer"
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
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
		<span class="sr-only">Search (Ctrl + K)</span>
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="bg-zinc-950/60 fixed inset-0 z-50" />
		<Dialog.Content
			class="outline-hidden sm:max-w-200 bg-zinc-900 border border-zinc-800 fixed left-[50%] top-[50%] z-50 max-h-dvh w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-y-auto md:w-full rounded-xl text-zinc-50 shadow p-1"
			style="color-scheme: dark;"
		>
			<Search />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
