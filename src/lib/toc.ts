export function generateTableOfContents(article: HTMLElement) {
	const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
	const tocList = document.createElement('ol');

	headings.forEach((heading) => {
		if (!heading.id && heading.textContent) {
			heading.id = heading.textContent.toLowerCase().replace(/\s/g, '-');
		}

		const tocItem = document.createElement('li');
		const headingLevel = parseInt(heading.tagName[1]);

		tocItem.style.marginLeft = `${(headingLevel - 1) * 20}px`;

		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.alignItems = 'center';

		if (headingLevel >= 3 && headingLevel <= 5) {
			const arrow = document.createElement('span');
			arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 256 256"><path d="M229.66,157.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,160H128A104.11,104.11,0,0,1,24,56a8,8,0,0,1,16,0,88.1,88.1,0,0,0,88,88h76.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,157.66Z"></path></svg>';
			arrow.style.marginRight = '0.5rem';
			container.appendChild(arrow);
		}

		const tocLink = document.createElement('a');
		tocLink.href = `#${heading.id}`;
		tocLink.textContent = heading.textContent;
		container.appendChild(tocLink);
		tocItem.appendChild(container);
		tocList.appendChild(tocItem);
	});

	headings.forEach((heading) => {
		heading.classList.add('group', 'relative', 'flex', 'items-center');

		const anchor = document.createElement('a');
		anchor.href = `#${heading.id}`;
		anchor.className = 'absolute left-[-1.5rem] pr-2 opacity-0 group-hover:opacity-100 transition-opacity';
		anchor.textContent = '#';

		heading.prepend(anchor);
	});

	return tocList;
}