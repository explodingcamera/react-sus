/* eslint no-bitwise: "off" */
import { Key, Arguments } from './types.js';

// simple public domain hash funciton, should be about as good as murmur3
const cyrb53 = (str: string, seed = 0) => {
	const [a, b, c, d] = [2654435761, 1597334677, 2246822507, 3266489909];

	let h1 = 3735928559 ^ seed;
	let h2 = 1103547991 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, a);
		h2 = Math.imul(h2 ^ ch, b);
	}

	h1 = Math.imul(h1 ^ (h1 >>> 16), c) ^ Math.imul(h2 ^ (h2 >>> 13), d);
	h2 = Math.imul(h2 ^ (h2 >>> 16), c) ^ Math.imul(h1 ^ (h1 >>> 13), d);
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const serialize = (_key: Key): { key: number; args: any[] } => {
	const key: Arguments = typeof _key === 'function' ? _key() : _key;
	const args = [...(Array.isArray(key) ? key : [key])];
	return { key: cyrb53(JSON.stringify(key)), args };
};
