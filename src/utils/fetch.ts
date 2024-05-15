import { getCookie } from './cookie';
import { initFingerprint } from './fingerprint';

import { DataInterface } from '../Event';
import { COOKIE_NAME } from '../constants';

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
		});

		return { ...response.json() };
    
	} catch {
		return { result: false };
	}
};

export { postEvents };