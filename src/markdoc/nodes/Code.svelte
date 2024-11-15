<script lang="ts">
	interface Props {
		content: string;
	}

	let { content }: Props = $props();
</script>

<code class="not-prose bg-zinc-800 py-1 px-1.5 rounded-md">{content}</code>
