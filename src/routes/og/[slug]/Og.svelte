<script lang="ts">
  interface Props {
    title: string;
    description: string;
    tags?: string[];
    publishedAt?: string;
    slug?: string;
  }

  let { title, description, tags = [], publishedAt, slug }: Props = $props();

  const visibleTags = $derived(tags.slice(0, 3));
  const extraTagCount = $derived(tags.length - visibleTags.length);

  const formattedDate = $derived(
    publishedAt
      ? new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
  );
</script>

<div
  class="flex w-full h-full bg-zinc-900"
  style="font-family: 'Hanken Grotesk Variable', 'sans-serif'"
>
  <div
    class="w-full h-full p-8 flex flex-col justify-between border-t-8 border-rose-600 text-white from-rose-600/10"
  >
    <!-- Top row: tags on the left, date on the right -->
    <div class="flex w-full items-start justify-between">
      <div class="flex flex-wrap gap-2">
        {#each visibleTags as tag (tag)}
          <div
            class="bg-rose-500/20 text-rose-100 rounded-full border-2 border-rose-500 uppercase font-bold px-4 py-2 text-xl"
          >
            {tag}
          </div>
        {/each}
        {#if extraTagCount > 0}
          <div
            class="flex items-center text-zinc-500 mb-3"
            style="font-size: 22px; padding: 6px 8px"
          >
            +{extraTagCount}
          </div>
        {/if}
      </div>

      {#if formattedDate}
        <div class="flex text-zinc-400" style="font-size: 24px">
          {formattedDate}
        </div>
      {/if}
    </div>

    <!-- Main content: the hero -->
    <div class="flex flex-col w-full">
      <div class="font-bold" style="font-size: 68px; line-height: 1.15">
        {title}
      </div>
      <div
        class="text-zinc-300"
        style="font-size: 28px; line-height: 1.5; margin-top: 20px; max-width: 90%"
      >
        {description}
      </div>
    </div>

    <!-- Footer: brand mark + slug -->
    <div class="flex w-full items-center" style="margin-top: 32px">
      {#if slug}
        <div class="text-zinc-500" style="font-size: 22px">
          /{slug}
        </div>
      {/if}
    </div>
  </div>
</div>
