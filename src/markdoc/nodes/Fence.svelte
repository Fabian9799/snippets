<script lang="ts">
	import { page } from '$app/stores';

	export let content: string;
	export let language: string;

	const html = $page.data.highlighter.codeToHtml(content, {
		lang: language,
		theme: 'dracula'
	});
</script>

<div class="not-prose border border-zinc-800 rounded-xl overflow-hidden code-block">
	{@html html}
</div>

<style>
	.code-block :global(pre) {
		padding: 20px;
		white-space: pre-wrap;
		overflow: auto;
	}
</style>
