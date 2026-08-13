<script lang="ts">
  import { resolve } from "$app/paths";

  let { data } = $props();
</script>

<svelte:head>
  <title>Tags</title>
</svelte:head>

<main class="p-2 max-w-2xl lg:max-w-4xl mx-auto">
  <div class="flex gap-2 mb-4">
    <button
      aria-label="Back"
      onclick={() => window.history.back()}
      class="uppercase h-min rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest p-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200 my-auto hover:border-rose-600 cursor-pointer"
    >
      <svg
        class="size-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        ><rect width="256" height="256" fill="none" /><polyline
          points="160 208 80 128 160 48"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="30"
        /></svg
      >
    </button>
    <p class="text-3xl font-bold my-auto">Tags</p>
  </div>
  <ul class="flex flex-wrap gap-2 leading-8">
    {#each data.tags as { tag, count } (tag)}
      <li>
        <a
          href={resolve("/tags/[tag]", { tag })}
          class="uppercase rounded-full hover:border-rose-600 hover:ring-3 ring-rose-600 font-semibold tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200"
          >#{tag}
          <span class="normal-case tracking-normal text-zinc-400 font-medium"
            >{count}</span
          ></a
        >
      </li>
    {/each}
  </ul>
</main>
