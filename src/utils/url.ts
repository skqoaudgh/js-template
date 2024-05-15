import { postPageView } from './fetch';
import { PAGE_VIEW_POST_URL } from '../constants';

interface PostWithRetryPayload {
	url?: string;
	count?: number;
}

const initUrlListener = () => {
	let previousUrl = '';

	const postWithRetry = ({ url = null, count = 3 }: PostWithRetryPayload = {}) => {
		if(count < 1 || !url) {
			return;
		}

		const timestamp = new Date().toISOString();

		previousUrl = window.location.href;
		postPageView(PAGE_VIEW_POST_URL, { visitedUrl: url, timestamp }).then(({ result }) => {
			if(!result) {
				if(count < 1) {
					return console.error('Failed to post page view data');
				}
                
				postWithRetry({ url, count: count-1 });
			}
		});
	};
    
	const observer = new MutationObserver(() => {
		if (window.location.href !== previousUrl) {
			postWithRetry({ url: window.location.href });
		}
	});
	const config = { subtree: true, childList: true };
	observer.observe(document, config);

	window.addEventListener('hashchange', () => {
		postWithRetry({ url: window.location.href });
	});
};

export { initUrlListener };
