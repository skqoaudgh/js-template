const getCookie = (name: string): string => {
	const value: string = `; ${document.cookie}`;
	const parts: string[] = value.split(`; ${name}=`);
    
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
};

const setCookie = (name: string, value: string): void => {
	document.cookie = name + '=' + (value || '') + '; path=/';
};

export { getCookie, setCookie };