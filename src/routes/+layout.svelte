<script lang="ts">
  import "../app.css";
  import { onNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import LoadingIndicator from "$lib/LoadingIndicator.svelte";
  import Search from "$lib/Search.svelte";
  import { SITE_URL } from "$lib/constants";
  import { listFavoriteSnippets } from "$lib/service/favorite";

  let { children } = $props();
  let favoriteCount = $derived(listFavoriteSnippets().length);
  let onFavorites = $derived(page.url.pathname === "/favorites");

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((done) => {
      document.startViewTransition(async () => {
        done();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <meta name="theme-color" content="#dc084a" />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Snippets RSS"
    href="{SITE_URL}/rss.xml"
  />
</svelte:head>

<a
  href="#content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-zinc-800 focus:px-3 focus:py-2"
>
  Skip to content
</a>

<nav
  aria-label="Main"
  class="sticky top-0 z-40 h-14 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md"
>
  <div
    class="flex h-full w-full max-w-2xl lg:max-w-4xl mx-auto items-center justify-between gap-4 px-2"
  >
    <a
      href={resolve("/")}
      class="text-xl font-bold hover:text-rose-500"
      aria-current={page.url.pathname === "/" ? "page" : undefined}
    >
      Snippets
    </a>
    <div class="flex items-center gap-2">
      <a
        href={resolve("/tags")}
        aria-current={page.url.pathname.startsWith("/tags")
          ? "page"
          : undefined}
        class={[
          "uppercase rounded-full hover:ring-3 ring-rose-600 text-sm h-min my-auto font-semibold tracking-widest px-2 py-1 border text-zinc-200 hover:border-rose-600 ",
          page.url.pathname.startsWith("/tags")
            ? "bg-rose-600/30 border-rose-600"
            : "bg-zinc-800/30 border-zinc-700",
        ]}>All Tags</a
      >
      <Search />
      <a
        href={resolve("/favorites")}
        class={[
          "relative inline-flex size-10 items-center justify-center rounded-md hover:text-rose-500",
          onFavorites && "text-rose-500",
        ]}
        title="Favorites"
        aria-label="Favorites, {favoriteCount} saved"
        aria-current={onFavorites ? "page" : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={onFavorites ? "currentColor" : "none"}
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
        <span
          class="absolute top-0.5 right-0 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-semibold leading-none text-zinc-100"
          aria-hidden="true"
        >
          {favoriteCount}
        </span>
      </a>
      <a
        href={resolve("/rss.xml")}
        class="inline-flex size-10 items-center justify-center rounded-md hover:text-rose-500"
        title="RSS feed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" />
        </svg>
        <span class="sr-only">RSS feed</span>
      </a>
    </div>
  </div>
</nav>

<div id="content" tabindex="-1" class="scroll-mt-32">
  {@render children?.()}
</div>

<LoadingIndicator />
