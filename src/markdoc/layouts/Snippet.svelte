<script lang="ts">
	import { page } from '$app/state';
	import { generateTableOfContents } from '$lib/toc';
	import { onMount, type Snippet } from 'svelte';
	import { innerHeight } from 'svelte/reactivity/window';

	interface Props {
		title: string;
		tags?: string[];
		description: string;
		children?: Snippet;
	}

	let { title, tags = [], description, children }: Props = $props();
	let slug = $derived(page.url.pathname.split('/').pop());

	let article: HTMLDivElement | undefined;
	let tocItems: Array<{ text: string; href: string; level: number }> = $state(
		[],
	);
	let headings: NodeListOf<HTMLHeadingElement>;
	let currentHeading = $state('');

	onMount(() => {
		if (article) {
			tocItems = generateTableOfContents(article);
			headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
			currentHeading = location.hash.slice(1);
			updateActiveHeading();

			if (window.location.hash) {
				const element = document.getElementById(
					window.location.hash.slice(1),
				);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}
	});

	function updateActiveHeading() {
		if (!headings) return;

		const threshold = (innerHeight.current ?? window.innerHeight) * 0.1;
		let found = false;

		for (let i = 0; i < headings.length; i++) {
			const heading = headings[i];
			const next = headings[i + 1];

			if (
				heading.getBoundingClientRect().top < threshold &&
				(!next || next.getBoundingClientRect().top > threshold)
			) {
				currentHeading = heading.id;
				found = true;
				break;
			}
		}

		if (!found && scrollY === 0) {
			currentHeading = '';
		}
	}

	function handleHashChange() {
		currentHeading = location.hash.slice(1);
	}

	function getIndentStyle(level: number) {
		if (level >= 3 && level <= 5) {
			const baseIndent = 5;
			const progressiveIndent = level >= 4 ? (level - 3) * 25 : 0;
			return `margin-left: ${baseIndent + progressiveIndent}px`;
		}
		return '';
	}

	function shouldShowArrow(level: number) {
		return level >= 3 && level <= 5;
	}
</script>

<svelte:window onscroll={updateActiveHeading} onhashchange={handleHashChange} />

<svelte:head>
	<title>{title}</title>
	<meta property="og:site_name" content="Snippets" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta
		property="og:url"
		content="https://snippets.fabian9799.cloud/snippet/{slug}"
	/>
	<meta name="description" content={description} />
	<meta name="twitter:description" content={description} />
	<meta property="og:description" content={description} />
	<meta
		property="og:image"
		content="https://snippets.fabian9799.cloud/og/{slug}.png"
	/>
	<meta
		name="twitter:image"
		content="https://snippets.fabian9799.cloud/og/{slug}.png"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image:alt" content={description} />
	<meta name="twitter:image:alt" content={description} />
</svelte:head>

<main class="flex">
	<div class="flex flex-1"></div>
	<article
		class="max-w-4xl mx-auto p-4 lg:border-r lg:border-zinc-800 w-full"
	>
		<div class="flex gap-2 flex-wrap">
			<a
				aria-label="Home"
				href="/"
				class="uppercase rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest p-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200 hover:border-rose-600"
			>
				<svg
					class="size-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 256 256"
				>
					<rect width="256" height="256" fill="none" />
					<path
						class="fill-current"
						d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"
					/>
				</svg>
			</a>
			{#each tags as tag}
				<a
					href="/tags/{tag}"
					class="uppercase rounded-xl hover:ring-3 ring-rose-600 font-semibold text-xs tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-800/30 text-zinc-200 hover:border-rose-600"
					>#{tag}</a
				>
			{/each}
		</div>

		<!-- Mobile TOC -->
		<details
			class="border-zinc-800 open:ring ring-zinc-800 rounded-xl group lg:hidden mt-4"
		>
			<summary
				class="cursor-pointer list-none text-lg font-semibold px-2 py-2 rounded-xl group-open:rounded-b-none hover:bg-zinc-800 group-open:bg-zinc-800 duration-200 flex gap-1"
			>
				<svg
					class="w-4 ml-2 transition-transform group-open:rotate-90 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 256 256"
				>
					<rect width="256" height="256" fill="none" />
					<path
						d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34Z"
					/>
				</svg>
				Table of Contents
			</summary>
			<div class="text-zinc-200 p-4 toc">
				<ol>
					{#each tocItems as item}
						<li style={getIndentStyle(item.level)}>
							<div class="flex items-center">
								{#if shouldShowArrow(item.level)}
									<span class="mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											class="fill-zinc-600"
											viewBox="0 0 256 256"
										>
											<path
												d="M229.66,157.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,160H128A104.11,104.11,0,0,1,24,56a8,8,0,0,1,16,0,88.1,88.1,0,0,0,88,88h76.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,157.66Z"
											></path>
										</svg>
									</span>
								{/if}
								<a class="hover:text-rose-500" href={item.href}
									>{item.text}</a
								>
							</div>
						</li>
					{/each}
				</ol>
			</div>
		</details>

		<h1
			class="font-extrabold text-4xl mt-4 mb-2"
			style="view-transition-name: snippet-{slug}-title"
		>
			{title}
		</h1>
		<p
			class="text-zinc-400 text-xl"
			style="view-transition-name: snippet-{slug}-description"
		>
			{description}
		</p>

		<div
			bind:this={article}
			class="prose-invert prose py-4 prose-rose max-w-none prose-headings:scroll-m-6"
		>
			{@render children?.()}
		</div>
	</article>

	<!-- Desktop Sidebar TOC -->
	<aside
		class="w-64 flex-1 sticky top-0 h-screen max-h-screen grow min-w-fit hidden lg:flex"
	>
		<div class="p-4 flex flex-col h-full">
			<div
				class="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4 min-w-64 max-w-96 flex flex-col min-h-0"
			>
				<p
					class="text-zinc-200 text-nowrap font-semibold mb-2 text-xl flex-shrink-0"
				>
					Table of Contents
				</p>
				<div class="text-zinc-300 toc overflow-y-auto flex-1">
					<ol>
						{#each tocItems as item}
							<li style={getIndentStyle(item.level)}>
								<div class="flex items-center">
									{#if shouldShowArrow(item.level)}
										<span class="mr-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												class="fill-zinc-600"
												viewBox="0 0 256 256"
											>
												<path
													d="M229.66,157.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,160H128A104.11,104.11,0,0,1,24,56a8,8,0,0,1,16,0,88.1,88.1,0,0,0,88,88h76.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,157.66Z"
												></path>
											</svg>
										</span>
									{/if}
									<a
										href={item.href}
										class={{
											'hover:text-rose-500': true,
											'text-rose-500':
												currentHeading ===
												item.href.slice(1),
										}}>{item.text}</a
									>
								</div>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	</aside>
</main>
