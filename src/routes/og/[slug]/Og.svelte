<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="flex text-3xl h-full bg-zinc-900 p-12">
	<div
		class="w-full p-8 flex flex-col justify-center items-center text-center border-8 rounded-[50px] border-rose-600 text-white"
	>
		<p class="font-bold" style="font-size: 80px">{title}</p>
		<p>{description}</p>
	</div>
</div>
