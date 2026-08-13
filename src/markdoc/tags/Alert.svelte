<script lang="ts">
  import { type Snippet } from "svelte";
  interface Props {
    children?: Snippet;
  }
  let { children }: Props = $props();
</script>

<div
  class="border-2 my-4 rounded-sm items-start border-rose-600 bg-rose-600/10 p-2 flex gap-2 text-white tracking-wide"
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
    class="stroke-rose-600 h-8"
    ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path
      d="M12 8h.01"
    /></svg
  >

  <div class="prose-invert prose prose-rose flex-1">
    {@render children?.()}
  </div>
</div>
