import EventContainerClass from './EventContainer';
import EventClass from './Event';

import { initFingerprint } from './utils/fingerprint';
initFingerprint();

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

/*
사용자 행동 데이터 (클릭, 페이지뷰, 스크롤)
전환 데이터 (구매 이벤트)
*/