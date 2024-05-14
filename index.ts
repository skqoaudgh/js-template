interface dataInterface {
	tag: string;
	label: string;
	attributes: object;
}

const EVENTS: string[] = ['click'];

const callback = (e: Event) => {
	const element = e.target as HTMLElement;
	const { attributes: attrs } = element;

	const labelArray: string[] = [];
	for (const child of element.childNodes) {
		if (child.nodeType === Node.TEXT_NODE) {
			labelArray.push(child.nodeValue);
		}
	}

	const attributes = Array.from(attrs).reduce((acc, { name, value }) => {
		acc[name] = value;
		return acc;
	}, {});

	const data: dataInterface = {
		tag: element.tagName,
		label: labelArray.join('\n'),
		...Object.keys(attributes).length > 0 && { attributes },
	};
	
	console.log(data);
};

EVENTS.forEach((event) => {
	window.addEventListener(event, callback);
});
