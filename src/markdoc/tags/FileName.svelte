<script>
	let { name, children } = $props();
	let copied = $state(false);
	function copyTextToClipboard() {
		navigator.clipboard.writeText(name);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 500);
	}
</script>

<div class="not-prose">
	<div class="px-3 w-fit">
		<div
			class={{
				' flex pl-2 pr-1 rounded-t-md gap-1 duration-200 ring-2': true,
				'ring-rose-500 bg-rose-500/30': copied,
				'ring-zinc-700 bg-zinc-700': !copied
			}}
		>
			<p class=" inline-block text-md font-jetbrains wrap-anywhere">
				{name}
			</p>
			<button onclick={copyTextToClipboard} aria-label="Copy to clipboard">
				<svg
					class=" p-0.5 h-5"
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
	</div>
	{@render children()}
</div>
