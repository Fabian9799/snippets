<script>
  import "../app.css";
  import { onNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import LoadingIndicator from "$lib/LoadingIndicator.svelte";
  import Search from "$lib/Search.svelte";
  let { children } = $props();

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
  <div class="flex h-full items-center justify-between gap-4 px-4 lg:px-8">
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
    </div>
  </div>
</nav>

<div id="content" tabindex="-1" class="scroll-mt-32">
  {@render children?.()}
</div>

<LoadingIndicator />
