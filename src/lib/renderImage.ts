import { render as renderImage } from 'takumi-js';
import { render } from 'svelte/server';

import { read } from '$app/server';
import atkinson400 from '$lib/fonts/atkinson-hyperlegible-latin-400-normal.ttf';
import atkinson700 from '$lib/fonts/atkinson-hyperlegible-latin-700-normal.ttf';
import type { Component, ComponentProps } from 'svelte';

const fontData400 = read(atkinson400).arrayBuffer();
const fontData700 = read(atkinson700).arrayBuffer();

/** Takumi's HTML parser reads Tailwind from `tw`; Svelte emits `class`. */
function classToTw(html: string) {
	return html.replaceAll(/\bclass=/g, 'tw=');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function componentToPng<TComponent extends Component<any>>(
	component: TComponent,
	props: ComponentProps<TComponent>,
	height: number,
	width: number
) {
	// @ts-expect-error Todo: type this
	const result = render(component, { props });

	const png = await renderImage(classToTw(result.body), {
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
		fontFamilies: ['Atkinson Hyperlegible'],
		height: +height,
		width: +width
	});

	return new Response(png, {
		headers: {
			'content-type': 'image/png'
		}
	});
}
