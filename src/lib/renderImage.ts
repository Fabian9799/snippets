import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';

import { read } from '$app/server';
import atkinson400 from '$lib/fonts/atkinson-hyperlegible-latin-400-normal.ttf';
import atkinson700 from '$lib/fonts/atkinson-hyperlegible-latin-700-normal.ttf';
const fontData400 = read(atkinson400).arrayBuffer();
const fontData700 = read(atkinson700).arrayBuffer();

export async function componentToPng(component, props, height, width) {
	const result = component.render(props);
	const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);
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
