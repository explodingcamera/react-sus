import './setup-dom.js';

import tap from 'tap';
import React, { Suspense } from 'react';

import {} from 'react-dom/next';
import { createRoot } from 'react-dom';

import { sus } from './../src/index.js';

const wait = async (ms: number) =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

void tap.test('basic functionality', async t => {
	const SomeComponent = () => {
		const data = sus<string>('test', async () => Promise.resolve('resolved'));
		return <div>{data}</div>;
	};

	const App = () => (
		<Suspense fallback={<div>...</div>}>
			<SomeComponent />
		</Suspense>
	);

	const el = document.createElement('div');
	createRoot(el).render(<App />);

	await wait(100);
	t.matchSnapshot(el.innerHTML, 'resolved');
});
