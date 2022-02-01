import { Config, getConfig } from './config.js';
import { serialize } from './serialize.js';
import { CacheEntry, globalState } from './state.js';
import { Fetcher, Key } from './types.js';

type Await<T> = T extends Promise<infer V> ? V : never;

const query =
	(preload: boolean) =>
	<Data = any>(
		_key: Key,
		_fetcher: Fetcher<Data> | undefined,
		userConfig?: Config<Data>,
	): Await<Data> => {
		const config = getConfig(userConfig);
		const cache = globalState.get(config.cacheProvider)!;
		const fetcher = _fetcher ? _fetcher : config.fetcher;

		const { key, args } = serialize(_key);

		const existingEntry = cache.requestCache.get(key);
		if (existingEntry) {
			// If we're pre-loading and the element is present, just return
			if (preload) return undefined as Await<Data>;

			// If an error occurred, throw
			if (Object.prototype.hasOwnProperty.call(existingEntry, 'error'))
				throw existingEntry.error as Error;

			// If a response was successful, return
			if (Object.prototype.hasOwnProperty.call(existingEntry, 'response'))
				return existingEntry.response as Await<Data>;

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
					// When it resolves, store its value
					.then((response: Data) => (entry.response = response))
					// Remove the entry if a lifespan was given
					.then(() => {
						// todo: livespan
						// if (config.lifespan && config.lifespan > 0) {
						// 	setTimeout(() => {
						// 		const index = globalCache.indexOf(entry);
						// 		if (index !== -1) globalCache.splice(index, 1);
						// 	}, config.lifespan);
						// }
					})
					// Store caught errors, they will be thrown in the render-phase to bubble into an error-bound
					.catch((error: any) => (entry.error = error)),
		};

		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		if (!preload) throw entry.promise;
		return undefined as Await<Data>;
	};

export const sus = query(false);
export const preload = query(true);

export { Config, Fetcher, Key };
