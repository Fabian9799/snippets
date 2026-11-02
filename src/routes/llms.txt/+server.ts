import { listSnippets } from "$lib/snippets";
import { SITE_URL } from "$lib/constants";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => {
  const items = listSnippets()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(
      ({ slug, title, description }) =>
        `- [${title}](${SITE_URL}/snippet/${slug}/llms.txt): ${description}`,
    )
    .join("\n");

  return new Response(`# Snippets\n\n${items}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
