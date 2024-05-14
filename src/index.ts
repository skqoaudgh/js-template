import EventContainerClass from './EventContainer';
import EventClass from './Event';

const eventContainer: EventContainerClass = EventContainerClass.getInstance();

const EVENTS: string[] = ['click'];

const callback = (e: Event) => {
	const element = e.target as HTMLElement;
	const eventInstance: EventClass = new EventClass(element);

	eventContainer.pushEvent(eventInstance);
};

EVENTS.forEach((event) => {
	window.addEventListener(event, callback);
});