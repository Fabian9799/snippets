<script lang="ts">
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	interface Props {
		content: string;
		language: string;
	}

	let { content, language }: Props = $props();

	const html = $page.data.highlighter.codeToHtml(content, {
		lang: language,
		theme: 'dracula',
	});

	let copied = $state(false);

	function copyTextToClipboard() {
		navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 500);
	}

	let showplayground = getContext('showplayground');

	async function codeToPlaygroundUrl(code: string) {
		const json = {
			name: 'Hello world',
			files: [
				{
					type: 'file',
					name: 'App.svelte',
					basename: 'App.svelte',
					contents: code,
					text: true,
				},
			],
			tailwind: false,
		};

		const compressed = await compress_and_encode_text(JSON.stringify(json));

		return `https://svelte.dev/playground/hello-world#${compressed}`;
	}

	async function compress_and_encode_text(input: string) {
		const reader = new Blob([input])
			.stream()
			.pipeThrough(new CompressionStream('gzip'))
			.getReader();
		let buffer = '';
		for (;;) {
			const { done, value } = await reader.read();
			if (done) {
				reader.releaseLock();
				// Some sites like discord don't like it when links end with =
				return btoa(buffer)
					.replaceAll('+', '-')
					.replaceAll('/', '_')
					.replace(/=+$/, '');
			} else {
				for (let i = 0; i < value.length; i++) {
					// decoding as utf-8 will make btoa reject the string
					buffer += String.fromCharCode(value[i]);
				}
			}
		}
	}
</script>

<div
	class="not-prose border-2 {copied
		? 'border-rose-500'
		: 'border-zinc-700'} duration-200 rounded-xl overflow-hidden code-block mb-4 relative"
>
	<div class="absolute top-0 right-0 flex">
		<button onclick={copyTextToClipboard} aria-label="Copy to clipboard">
			<svg
				class="{copied
					? 'text-rose-500 bg-rose-500/20'
					: 'bg-zinc-50/10'} p-2 w-9 rounded-bl-xl duration-200 cursor-pointer"
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
		{#if showplayground}
			{#await codeToPlaygroundUrl(content) then value}
				<a
					href={value}
					aria-label="Open in playground"
					target="_blank"
					class="p-2 w-9 duration-200 cursor-pointer bg-zinc-50/10"
				>
					<svg
						class="w-4"
						viewBox="0 0 256 308"
						preserveAspectRatio="xMidYMid"
						><path
							d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244"
							fill="#d1d5db"
						/><path
							d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398"
							fill="#3d3f49"
						/></svg
					>
				</a>
			{/await}
		{/if}
	</div>

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>

<style>
	.code-block :global(pre) {
		padding: 20px;
		overflow: auto;

		scrollbar-color: #3f3f46 #282a35;
	}
</style>
