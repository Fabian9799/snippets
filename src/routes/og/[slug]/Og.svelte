<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="flex text-3xl h-full bg-zinc-900 p-8">
	<div
		class="w-full flex flex-col justify-center items-center text-center border-8 border-rose-600 text-white"
	>
		<p class="font-bold" style="font-size: 80px">{title}</p>
		<p>{description}</p>
	</div>
</div>
