<script lang="ts">
	import { type Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<div
	class="border-2 my-4 rounded-xl items-center border-rose-600 bg-rose-600/10 p-3 flex gap-2 text-white tracking-wide"
>
	<svg
		class="fill-rose-600 h-8"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 256 256"
	>
		<path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2">
		</path>
		<path
			d="M144,176a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176Zm88-48A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM124,96a12,12,0,1,0-12-12A12,12,0,0,0,124,96Z"
		>
		</path>
	</svg>

	<div class="prose-invert prose prose-rose flex-1">
		{@render children?.()}
	</div>
</div>
