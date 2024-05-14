export interface DataInterface {
	tag: string;
	label: string;
	attributes: object;
	date: string;
}

class Event {
	private tag: string;
	private label: string;
	private attributes: object;
	private date: string;
    
	constructor(element: HTMLElement) {
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

		this.tag = element.tagName;
		this.label=  labelArray.join('\n');
		this.attributes = attributes;
		this.date = new Date().toISOString();
	}

	getEventData(): DataInterface {
		return {
			tag: this.tag,
			label: this.label,
			...Object.keys(this.attributes).length > 0 && { attributes: this.attributes },
			date: this.date,
		};
	}
}

export default Event;