export interface DataInterface {
	url: string;
	tag: string;
	label: string;
	attributes: object;
	timestamp: string;
}

class Event {
	private url: string;
	private tag: string;
	private label: string;
	private attributes: object;
	private timestamp: string;
    
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

		this.url = window.location.href;
		this.tag = element.tagName;
		this.label =  labelArray.join('\n');
		this.attributes = attributes;
		this.timestamp = new Date().toISOString();
	}

	getEventData(): DataInterface {
		return {
			url: this.url,
			tag: this.tag,
			label: this.label,
			...Object.keys(this.attributes).length > 0 && { attributes: this.attributes },
			timestamp: this.timestamp,
		};
	}
}

export default Event;