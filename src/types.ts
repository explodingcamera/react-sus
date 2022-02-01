// Arguments
type ArgumentsTuple = [any, ...unknown[]] | readonly [any, ...unknown[]];
export type Arguments =
	| string
	| ArgumentsTuple
	| Record<any, any>
	| undefined
	| undefined
	| false;
export type Key = Arguments | (() => Arguments);

// Fetcher
export type FetcherResponse<Data = unknown> = Data | Promise<Data>;
export type Fetcher<
	Data = unknown,
	SUSKey extends Key = Key,
> = SUSKey extends () =>
	| readonly [...infer Args]
	| undefined
	| undefined
	| false
	? (...args: [...Args]) => FetcherResponse<Data>
	: SUSKey extends readonly [...infer Args]
	? (...args: [...Args]) => FetcherResponse<Data>
	: SUSKey extends () => infer Arg | undefined | undefined | false
	? (...args: [Arg]) => FetcherResponse<Data>
	: SUSKey extends undefined | undefined | false
	? never
	: SUSKey extends infer Arg
	? (...args: [Arg]) => FetcherResponse<Data>
	: never;

// Cache
export interface Cache<Data = any> {
	get(key: Key): Data | undefined | undefined;
	set(key: Key, value: Data): void;
	delete(key: Key): void;
}
