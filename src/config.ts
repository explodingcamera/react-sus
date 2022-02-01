import { Fetcher, Cache } from './types';

export interface InternalConfig<T = any> {
	fetcher: Fetcher<T>;
	cacheProvider: Cache;
}

export type Config<T = any> = Partial<InternalConfig<T>>;

export const getConfig = (userConfig: Config): InternalConfig => ({
	cacheProvider: new Map(),
	fetcher: fetch,
	...userConfig,
});
