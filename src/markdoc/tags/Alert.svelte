<script lang="ts">
	import { type Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<div
	class="border-2 my-4 rounded-xl border-rose-600 bg-rose-600/20 p-3 flex gap-2 text-white tracking-wide"
>
	<svg
		class="h-7"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg
	>
	<div class="prose-invert prose prose-rose flex-1">
		{@render children?.()}
	</div>
</div>
