<script lang="ts">
	import { animate, svg, stagger } from 'animejs';
	import { createTimeline } from 'animejs';

	let pathElements: HTMLOrSVGElement[] = [];
	let svgElement: HTMLOrSVGElement;

	function animateLogo() {
		createTimeline()
			.add(svg.createDrawable(pathElements), {
				draw: ['0 1', '1 1'],
				stroke: ['#ff073a', '#ff6a00', '#ccff00', '#0099ff', '#ffffff'],
				'stroke-linecap': 'square',
				ease: 'inOutCubic',
				duration: 500
			})
			.add(svg.createDrawable(pathElements), {
				draw: ['0 0'],
				stroke: 'transparent',
				duration: 200
			})

			.add(svg.createDrawable(pathElements), {
				draw: ['0 0', '0 1'],
				stroke: ['#ff073a', '#ff6a00', '#ccff00', '#0099ff', '#ffffff'],
				'stroke-linecap': 'square',
				ease: 'inOutCubic',
				duration: 500,
				delay: stagger(500)
			});
	}
</script>

<button onclick={animateLogo} aria-label="Logo" class="w-10" bind:this={svgElement}>
	<svg
		class="size-full fill-none origin-top-left"
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
