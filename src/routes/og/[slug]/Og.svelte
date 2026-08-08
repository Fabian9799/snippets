<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div
	class="flex w-full h-full bg-zinc-900 p-6"
	style="font-family: 'Atkinson Hyperlegible'"
>
	<div
		class="w-full p-8 flex justify-center items-center border-8 rounded-2xl border-rose-600 text-white from-rose-600/10 bg-linear-to-t"
	>
		<div class="w-full text-center">
			<div class="font-bold" style="font-size: 80px; line-height: 1.1">
				{title}
			</div>
			<div style="font-size: 30px; line-height: 1.3; margin-top: 12px">
				{description}
			</div>
		</div>
	</div>
</div>
