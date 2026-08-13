<script lang="ts">
  import Article from "$lib/Article.svelte";
  import { listFavoriteSnippets } from "$lib/service/favorite";

  let snippets = $derived(listFavoriteSnippets());
</script>

<svelte:head>
  <title>Favorites</title>
</svelte:head>

<main class="p-2 max-w-2xl lg:max-w-4xl mx-auto">
  <p class="text-3xl font-bold mb-4">Favorites</p>
  {#if snippets.length === 0}
    <p class="text-zinc-400 text-xl">
      No favorites yet. Star a snippet to save it here.
    </p>
  {:else}
    <ul class="grid sm:grid-cols-2 flex-wrap gap-4">
      {#each snippets as snippet (snippet.slug)}
        <li>
          <Article
            slug={snippet.slug}
            title={snippet.title}
            description={snippet.description}
            tags={snippet.tags}
          />
        </li>
      {/each}
    </ul>
  {/if}
</main>
