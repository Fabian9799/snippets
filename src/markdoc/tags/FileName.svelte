<script>
	let { name, children } = $props();
</script>

<div class="not-prose">
	<p class="bg-zinc-700 w-min px-2 rounded-t-md ml-3 text-md font-jetbrains">{name}</p>
	{@render children()}
</div>
