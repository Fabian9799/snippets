<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div
	class="flex w-full h-full text-3xl bg-zinc-900 p-6"
	style="font-family: 'Atkinson Hyperlegible'"
>
	<div
		class="w-full p-8 flex flex-col justify-center items-center text-center border-8 rounded-2xl border-rose-600 text-white from-rose-600/10 bg-linear-to-t"
	>
		<p class="font-bold" style="font-size: 80px">{title}</p>
		<p>{description}</p>
	</div>
</div>
