import { Cache } from './types';

export interface CacheEntry<T = any> {
	response?: T;
	error?: any;
	promise: Promise<T>;
}

export type GlobalState = {
	requestCache: Map<number, CacheEntry>;
	// Some stuff swr is using in their global state as a inspiration:
	// Record<string, RevalidateCallback[]>, // EVENT_REVALIDATORS
	// Record<string, StateUpdateCallback[]>, // STATE_UPDATERS
	// Record<string, [number, number]>, // MUTATION: [ts, end_ts]
	// Record<string, [any, number]>, // FETCH: [data, ts]
	// ScopedMutator, // Mutator
};

export const globalState = new WeakMap<Cache, GlobalState>();
