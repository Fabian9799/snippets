import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { render } from 'svelte/server';

import { read } from '$app/server';
import atkinson400 from '$lib/fonts/atkinson-hyperlegible-latin-400-normal.ttf';
import atkinson700 from '$lib/fonts/atkinson-hyperlegible-latin-700-normal.ttf';
import type {  Component, ComponentProps } from 'svelte';
const fontData400 = read(atkinson400).arrayBuffer();
const fontData700 = read(atkinson700).arrayBuffer();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function componentToPng<TComponent extends Component<any>>(component: TComponent, props: ComponentProps<TComponent>, height: number, width: number) {
	// @ts-expect-error Todo: type this
	const result = render(component, { props });
	const markup = toReactNode(result.body);
	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Atkinson Hyperlegible',
				data: await fontData400,
				style: 'normal',
				weight: 400
			},
			{
				name: 'Atkinson Hyperlegible',
				data: await fontData700,
				style: 'normal',
				weight: 700
			}
		],
		height: +height,
		width: +width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: +width
		}
	});

	const png = resvg.render();

	return new Response(png.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
}
