export function generateTableOfContents(article: HTMLElement) {
	const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
	const usedIds = new Set<string>();
	const tocItems: Array<{ text: string; href: string; level: number }> = [];

	// First pass: generate unique IDs for all headings
	headings.forEach((heading) => {
		if (!heading.id && heading.textContent) {
			let baseId = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
			let uniqueId = baseId;
			let counter = 1;

			// Keep incrementing counter until we find a unique ID
			while (usedIds.has(uniqueId)) {
				uniqueId = `${baseId}-${counter}`;
				counter++;
			}

			heading.id = uniqueId;
			usedIds.add(uniqueId);
		} else if (heading.id) {
			// If heading already has an ID, track it to avoid duplicates
			usedIds.add(heading.id);
		}
	});

	// Second pass: build the TOC data
	headings.forEach((heading) => {
		if (heading.textContent && heading.id) {
			tocItems.push({
				text: heading.textContent,
				href: `#${heading.id}`,
				level: parseInt(heading.tagName[1])
			});
		}
	});

	// Third pass: add anchor links to headings
	headings.forEach((heading) => {
		heading.classList.add('group', 'relative', 'flex', 'items-center');

		const anchor = document.createElement('a');
		anchor.href = `#${heading.id}`;
		anchor.className = 'absolute left-[-1.5rem] pr-2 opacity-0 group-hover:opacity-100 transition-opacity';
		anchor.textContent = '#';

		heading.prepend(anchor);
	});

	return tocItems;
}