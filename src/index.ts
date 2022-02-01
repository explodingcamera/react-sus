import { Config, getConfig } from './config.js';
import { serialize } from './serialize.js';
import { globalState } from './state.js';
import { Fetcher, Key } from './types.js';

export const sus = <Data = any>(
	_key: Key,
	fetcher: Fetcher<Data> | undefined,
	userConfig: Config<Data>,
) => {
	const config = getConfig(userConfig);
	const state = globalState.get(config.cacheProvider);

	const { key, args } = serialize(_key);

	return {};
};

export { Config, Fetcher, Key };
