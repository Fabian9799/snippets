<script lang="ts">
	import { page } from '$app/stores';

	export let content: string;
	export let language: string;

	const html = $page.data.highlighter.codeToHtml(content, {
		lang: language,
		theme: 'dracula'
	});

	let copied = false;

	function copyTextToClipboard() {
		navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 500);
	}
</script>

<div
	class="not-prose border-2 {copied
		? 'border-green-500'
		: 'border-zinc-800'} duration-200 rounded-xl overflow-hidden code-block relative"
>
	<div class="absolute top-0 right-0 p-2">
		<button on:click={copyTextToClipboard}>
			<svg
				class="{copied ? 'text-green-500 bg-green-500/20' : ''} p-2 w-10 rounded-md duration-200"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				/></svg
			>
		</button>
	</div>

	{@html html}
</div>

<style>
	.code-block :global(pre) {
		padding: 20px;
		white-space: pre-wrap;
		overflow: auto;
	}
</style>
