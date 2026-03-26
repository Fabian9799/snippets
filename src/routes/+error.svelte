<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="w-full min-h-screen flex items-center justify-center">
    <h1 class="text-4xl font-bold">{page.status}: {page.error?.message}</h1>
</div>
