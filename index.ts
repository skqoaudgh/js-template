interface dataInterface {
	tag: string;
	label: string;
}

const EVENTS: string[] = ['click'];

const callback = (e: Event) => {
	const labelArray: string[] = [];
	const element = e.target as HTMLElement;

	for (const child of element.childNodes) {
		if (child.nodeType === Node.TEXT_NODE) {
			labelArray.push(child.nodeValue);
		}
	}

	const data: dataInterface = {
		tag: element.tagName,
		label: labelArray.join('\n'),
	};
	
	console.log(data);
};

EVENTS.forEach((event) => {
	window.addEventListener(event, callback);
});
