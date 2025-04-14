<script lang="ts">
	import { animate, svg, stagger } from 'animejs';

	let pathElements: HTMLOrSVGElement[] = [];

	function animateLogo() {
		animate(svg.createDrawable(pathElements), {
			draw: ['0 0', '0 1'],
			ease: 'inOutCubic',
			stroke: ['#ff073a', '#ff6a00', '#ccff00', '#0099ff', '#ffffff'],
			duration: 2000,
			delay: stagger(1000)
		});
	}
</script>

<button onclick={animateLogo} aria-label="Logo">
	<svg
		class="size-10 fill-none origin-top-left bg-zinc-900"
		viewBox=".25 .25 4 4"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			bind:this={pathElements[0]}
			d="M1 3.5 1 1 3.5 1"
			stroke-width=".5"
			stroke-linecap="square"
			stroke="white"
		/>
		<path
			bind:this={pathElements[1]}
			d="M3.5 3.5 2 3.5 2 2 3.5 2 3.5 3.5"
			stroke-width=".5"
			stroke-linecap="square"
			stroke="white"
		/>
	</svg>
</button>
