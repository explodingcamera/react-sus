import { Config, getConfig } from './config.js';
import { serialize } from './serialize.js';
import { CacheEntry, globalState } from './state.js';
import { Fetcher, Key } from './types.js';

type Await<T> = T extends Promise<infer V> ? V : never;

export const isResponse = (data: any): data is Response =>
	typeof data === 'object' &&
	typeof Response === 'object' &&
	data instanceof Response;

let retrycount = 0;

const query =
	(preload: boolean) =>
	<Data = any>(
		_key: Key,
		_fetcher?: Fetcher<Data> | undefined,
		userConfig?: Config<Data>,
	): Await<Data> => {
		// fail-safe incase of infinite loops
		retrycount++;
		if (retrycount > 20) return '' as Await<Data>;

		const config = getConfig(userConfig);

		if (!globalState.has(config.cacheProvider))
			globalState.set(config.cacheProvider, { requestCache: new Map() });
		const cache = globalState.get(config.cacheProvider)!;

		const fetcher = _fetcher ? _fetcher : config.fetcher;

		if (!fetcher) throw new Error('no fetcher provided');

		const { key, args } = serialize(_key);
		const existingEntry = cache.requestCache.get(key);
		if (existingEntry) {
			// If we're pre-loading and the element is present, just return
			if (preload) return undefined as Await<Data>;

			// If an error occurred, throw
			if (existingEntry.error) throw existingEntry.error as Error;

			// If a response was successful, return
			if (existingEntry.response) return existingEntry.response as Await<Data>;

			// If the promise is still unresolved, throw
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			if (!preload) throw existingEntry.promise;
		}

		// The request is new or has changed.
		const entry: CacheEntry = {
			response: undefined,
			error: undefined,
			promise:
				// Execute the promise
				fetcher(...args)
					// Call .json on fetch responses
					.then((response: any) => {
						if (isResponse(response)) {
							return response.json();
						}

						return response;
					})
					// When it resolves, store its value
					.then((response: Data) => (entry.response = response))
					// Remove the entry if a lifespan was given
					// .then(() => {
					// todo: livespan like suspend-react?
					// Store caught errors, they will be thrown in the render-phase to bubble into an error-bound
					.catch((error: any) => (entry.error = error)),
		};

		cache.requestCache.set(key, entry);

		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		if (!preload) throw entry.promise;
		return undefined as Await<Data>;
	};

export const sus = query(false);
export const preload = query(true);

export { Config, Fetcher, Key };
