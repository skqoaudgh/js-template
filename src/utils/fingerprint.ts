import { setCookie } from './cookie';
import { COOKIE_NAME } from '../constants';

const initFingerprint = async (): Promise<string> => {
	let features = '';

	// get fonts
	const spansContainer = document.createElement('div');
	spansContainer.style.setProperty('visibility', 'hidden', 'important');

	const testString = 'mmMwWLliI0O&1';
	const textSize = '48px';

	const baseFonts = ['monospace', 'sans-serif', 'serif'];

	const fontList = [
		'sans-serif-thin', 'ARNO PRO', 'Agency FB', 'Arabic Typesetting',
		'Arial Unicode MS', 'AvantGarde Bk BT', 'BankGothic Md BT', 'Batang',
		'Bitstream Vera Sans Mono', 'Calibri', 'Century', 'Century Gothic',
		'Clarendon', 'EUROSTILE', 'Franklin Gothic', 'Futura Bk BT', 'Futura Md BT',
		'GOTHAM', 'Gill Sans', 'HELV', 'Haettenschweiler', 'Helvetica Neue',
		'Humanst521 BT', 'Leelawadee', 'Letter Gothic', 'Levenim MT',
		'Lucida Bright', 'Lucida Sans', 'Menlo', 'MS Mincho',
		'MS Outlook', 'MS Reference Specialty', 'MS UI Gothic',
		'MT Extra', 'MYRIAD PRO', 'Marlett', 'Meiryo UI',
		'Microsoft Uighur', 'Minion Pro', 'Monotype Corsiva', 'PMingLiU',
		'Pristina', 'SCRIPTINA', 'Segoe UI Light', 'Serifa', 'SimHei', 'Small Fonts',
		'Staccato222 BT', 'TRAJAN PRO', 'Univers CE 55 Medium', 'Vrinda', 'ZWAdobeF',
	];

	const h = document.getElementsByTagName('body')[0];

	const s = document.createElement('span');
	s.style.fontSize = textSize;
	s.textContent = testString;
	const defaultWidth = {};
	const defaultHeight = {};
	for (const index in baseFonts) {
		s.style.fontFamily = baseFonts[index];
		h.appendChild(s);
		defaultWidth[baseFonts[index]] = s.offsetWidth;
		defaultHeight[baseFonts[index]] = s.offsetHeight;
		h.removeChild(s);
	}

	const detect = (font) => {
		let detected = false;
		for (const index in baseFonts) {
			s.style.fontFamily = font + ',' + baseFonts[index];
			h.appendChild(s);
			const matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
			h.removeChild(s);
			detected = detected || matched;
		}
		return detected;
	};

	features += fontList.filter(detect).join(',');

	// get screen features
	const scr = screen;

	const parseDimension = (value) => parseInt(value) ? parseInt(value) : null;
	const dimensions = [parseDimension(scr.width), parseDimension(scr.height)];
	dimensions.sort().reverse();

	features += dimensions.join(',');

	const n = navigator;

	let maxTouchPoints = 0;
	let touchEvent;
	if (n.maxTouchPoints !== undefined) {
		maxTouchPoints = n.maxTouchPoints;
	}
	try {
		document.createEvent('TouchEvent');
		touchEvent = true;
	} catch {
		touchEvent = false;
	}
	const touchStart = 'ontouchstart' in window;

	features += maxTouchPoints;
	features += touchEvent;
	features += touchStart;

	// get canvas fingerprint
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const txt = 'abz190#$%^@£éú';

	ctx.fillStyle = 'rgb(255,0,255)';
	ctx.beginPath();
	ctx.rect(20, 20, 150, 100);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = 'rgb(0,255,255)';
	ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.stroke();   
	ctx.closePath();

	ctx.textBaseline = 'top';
	ctx.font = '17px "Arial 17"';
	ctx.textBaseline = 'alphabetic';
	ctx.fillStyle = 'rgb(255,5,5)';
	ctx.rotate(.03);
	ctx.fillText(txt, 4, 17);
	ctx.fillStyle = 'rgb(155,255,5)';
	ctx.shadowBlur = 8;
	ctx.shadowColor = 'red';
	ctx.fillRect(20, 12, 100, 5);

	features += canvas.toDataURL();

	const getHash = (str, algo = 'SHA-512') => {
		const strBuf = new TextEncoder().encode(str);
		return crypto.subtle.digest(algo, strBuf)
			.then((hash) => {
				let result = '';
				const view = new DataView(hash);
				for (let i = 0; i < hash.byteLength; i += 4) {
					result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
				}
				return result;
			});
	};

	const hash = await getHash(features);
	setCookie(COOKIE_NAME, hash);

	return hash;
};

export { initFingerprint };