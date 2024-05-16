import { postPageView, postPageStayData } from './fetch';
import { PAGE_VIEW_POST_URL, PAGE_STAY_POST_URL } from '../constants';

interface PostPageViewPayload {
	url: string;
	count?: number;
}

interface PostPageStayPayload {
	startTime: Date,
	endTime: Date,
	count?: number;
}

const initUrlListener = () => {
	let previousUrl: string = '';
	let startTime: Date;

	const postPageViewWithRetry = ({ url, count = 3 }: PostPageViewPayload) => {
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
                
				postPageViewWithRetry({ url, count: count - 1 });
			}
		});
	};

	const postPageStayWithRetry = ({ startTime, endTime, count = 3 }: PostPageStayPayload) => {
		if(count < 1) {
			return;
		}

		const startString: string = startTime.toISOString();
		const endString: string = endTime.toISOString();

		postPageStayData(PAGE_STAY_POST_URL, {
			previousUrl,
			currentUrl: window.location.href,
			startTime: startString, 
			endTime: endString,
		}).then(({ result }) => {
			if(!result) {
				if(count < 1) {
					return;
				}
                
				postPageStayWithRetry({ startTime, endTime, count: count - 1 });
			}
		});
	};
    
	const observer = new MutationObserver(() => {
		if (window.location.href !== previousUrl) {
			postPageViewWithRetry({ url: window.location.href });
		}
	});
	const config = { subtree: true, childList: true };
	observer.observe(document, config);

	window.addEventListener('hashchange', () => {
		postPageViewWithRetry({ url: window.location.href });
	});

	window.addEventListener('load', () => {
		startTime = new Date();
	});

	window.addEventListener('beforeunload', async () => {
		postPageStayWithRetry({ startTime, endTime: new Date() });
		return '';
	});
};

export { initUrlListener };
