import { getCookie } from './cookie';
import { initFingerprint } from './fingerprint';

import { DataInterface } from '../Event';
import { COOKIE_NAME } from '../constants';

interface PostPageStayPayload {
	previousUrl: string;
	currentUrl: string;
	startTime: string,
	endTime: string,
}

const postEvents = async (url: string, payload: DataInterface[]) => {
	const userId = getCookie(COOKIE_NAME) || (await initFingerprint());

	const body = {
		data: payload,
		key: 'key',
		userId,
	};
	
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			keepalive: true,
		});

		return { ...response.json() };
    
	} catch {
		return { result: false };
	}
};

const postPageView = async (url: string, { visitedUrl, timestamp }) => {
	const userId = getCookie(COOKIE_NAME) || (await initFingerprint());

	const body = {
		url: visitedUrl,
		key: 'key',
		userId,
		timestamp,
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			keepalive: true,
		});

		return { ...response.json() };
    
	} catch {
		return { result: false };
	}
};

const postPageStayData = async (url: string, { previousUrl, currentUrl, startTime, endTime }: PostPageStayPayload) => {
	const userId = getCookie(COOKIE_NAME) || (await initFingerprint());

	const body = {
		previousUrl,
		currentUrl,
		key: 'key',
		userId,
		startTime,
		endTime,
	};

	try {
		const response = navigator.sendBeacon(url, JSON.stringify(body)); // text/plain

		return { result: response };
    
	} catch {
		return { result: false };
	}
};

export { postEvents, postPageView, postPageStayData };