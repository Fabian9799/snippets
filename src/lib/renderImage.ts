import { render as renderImage } from "takumi-js";
import { render } from "svelte/server";

import { read } from "$app/server";
import hanken from "@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2";
import type { Component, ComponentProps } from "svelte";

const hankenFontData = read(hanken).arrayBuffer();

/** Takumi's HTML parser reads Tailwind from `tw`; Svelte emits `class`. */
function classToTw(html: string) {
  return html.replaceAll(/\bclass=/g, "tw=");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function componentToPng<TComponent extends Component<any>>(
  component: TComponent,
  props: ComponentProps<TComponent>,
  height: number,
  width: number,
) {
  // @ts-expect-error Todo: type this
  const result = render(component, { props });

  const png = await renderImage(classToTw(result.body), {
    fonts: [
      {
        name: "Hanken Grotesk Variable",
        data: await hankenFontData,
        style: "normal",
        weight: 400,
      },
    ],
    fontFamilies: ["Hanken Grotesk Variable"],
    height: +height,
    width: +width,
  });

  return new Response(png, {
    headers: {
      "content-type": "image/png",
    },
  });
}
