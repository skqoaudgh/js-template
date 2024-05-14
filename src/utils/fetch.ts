import { DataInterface } from '../Event';

const postEvents = async (url: string, payload: DataInterface[]) => {
	const body = {
		data: payload,
		key: 'key',
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