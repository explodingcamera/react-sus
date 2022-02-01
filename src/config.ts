import { Fetcher, Cache } from './types';

export interface InternalConfig<T = any> {
	fetcher?: Fetcher<T>;
	cacheProvider: Cache;
}

export type Config<T = any> = Partial<InternalConfig<T>>;

const fallbackFetcher = globalThis?.fetch ? globalThis?.fetch : undefined;

const defaultCacheProvider = new Map();
export const getConfig = (userConfig: Config = {}): InternalConfig => ({
	cacheProvider: defaultCacheProvider,
	fetcher: fallbackFetcher,
	...userConfig,
});
