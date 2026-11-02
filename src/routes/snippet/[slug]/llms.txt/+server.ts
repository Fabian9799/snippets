import { error } from "@sveltejs/kit";
import { listSnippets } from "$lib/snippets";
import type { EntryGenerator, RequestHandler } from "./$types";

const files = import.meta.glob<string>("/src/routes/snippet/*/+page.markdoc", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const prerender = true;

export const entries: EntryGenerator = () =>
  listSnippets().map(({ slug }) => ({ slug }));

export const GET: RequestHandler = ({ params }) => {
  const content = files[`/src/routes/snippet/${params.slug}/+page.markdoc`];
  if (!content) error(404);

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
