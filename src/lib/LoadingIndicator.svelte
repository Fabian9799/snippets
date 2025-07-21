<script lang="ts">
    import { navigating } from '$app/state';

    type Props = {
        loading?: boolean;
    };
    let { loading = false }: Props = $props();

    let shouldShow = $derived(navigating.to || loading);
</script>

{#if shouldShow}
    <div
        class="progress-bar fixed left-0 top-0 z-[99999] h-[3px] bg-rose-600"
        class:loading-state={loading}
    ></div>
{/if}

<style>
    @keyframes progress {
        0% {
            width: 0%;
        }
        50% {
            width: 0%;
        }
        100% {
            width: 90%;
        }
    }

    .progress-bar {
        animation: progress 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        box-shadow:
            0 0 10px color-mix(in srgb, var(--color-rose-700) 100%, transparent),
            0 0 20px color-mix(in srgb, var(--color-rose-700) 100%, transparent);
    }

    .progress-bar.loading-state {
        width: 80%;
        animation: none;
    }
</style>
