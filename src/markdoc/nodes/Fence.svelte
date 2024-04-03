<script lang="ts">
	import { highlighter } from '$lib/shiki';
	import { codeToHtml } from 'shiki';

	export let content: string;
	export let language: string;
	export let process: boolean;

	const html = highlighter.codeToHtml(content, {
		lang: language,
		theme: 'night-owl',
		transformers: [
			{
				pre(node) {
					this.addClassToHast(node, 'p-4');
				}
			}
		]
	});
</script>

<div class="not-prose border border-zinc-800 rounded-xl overflow-x-auto">
	{@html html}
</div>
