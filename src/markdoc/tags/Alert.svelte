<script lang="ts">
	export let text: string;
</script>

<div class="border-2 my-4 rounded-xl border-rose-600 bg-rose-600/20 p-3 not-prose flex gap-2">
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
	<p class="flex-1 text-white tracking-wide">{text}</p>
</div>
