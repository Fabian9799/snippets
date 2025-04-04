<script>
	let { name, children } = $props();
</script>

<div class="not-prose">
	<div class="px-3">
		<p class="bg-zinc-700 inline-block px-2 rounded-t-md text-md font-jetbrains wrap-anywhere">
			{name}
		</p>
	</div>
	{@render children()}
</div>
