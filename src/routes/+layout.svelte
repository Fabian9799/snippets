<script>
	import '../app.postcss';
	import { onNavigate } from '$app/navigation';
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#dc084a" />
</svelte:head>

{@render children?.()}
