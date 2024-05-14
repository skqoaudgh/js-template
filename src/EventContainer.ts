import Event, { DataInterface } from './Event';
import { postEvents } from './utils/fetch';

const URL = 'http://localhost:3000';
const MAX_PAYLOAD_SIZE: number = 5;

interface PostWithRetryPayload {
	events?: Event[];
	count?: number;
}

class EventContainer {
	private static instance: EventContainer;
	private events: Event[] = [];

	private constructor() {
		this.events = [];

		this.postWithRetry = this.postWithRetry.bind(this);

		window.addEventListener('beforeunload', () => {
			this.postWithRetry();
		});
		setInterval(this.postWithRetry, 5000);
	}

	static getInstance(): EventContainer {
		if (!EventContainer.instance) {
			EventContainer.instance = new EventContainer();
		}

		return EventContainer.instance;
	}

	private postWithRetry({ events = null, count = 3 }: PostWithRetryPayload = {}) {
		if(count < 1 || ((!events || events.length === 0) && (!this.events || this.events.length === 0))) {
			return;
		}

		const targetEvents: Event[] = events ? [...events] : [...this.events];
		const parsedEvents: DataInterface[] = targetEvents.map((event) => event.getEventData());
		this.events = [];
        
		postEvents(URL, parsedEvents).then(({ result }) => {
			if(!result) {
				if(count < 1) {
					return console.error('Failed to post event data');
				}
                
				this.postWithRetry({ events: targetEvents, count: count-1 });
			}
		});
	}

	pushEvent(event: Event) {
		this.events.push(event);

		if(this.events.length >= MAX_PAYLOAD_SIZE) {
			this.postWithRetry();
		}
	}

	pushEvents(events: Event[]) {
		this.events.push(...events);

		if(this.events.length >= MAX_PAYLOAD_SIZE) {
			this.postWithRetry();
		}
	}
}

export default EventContainer;