import './setup-dom.js';

import tap from 'tap';
import React, { Suspense } from 'react';

import {} from 'react-dom/next';
import { createRoot } from 'react-dom';

import { sus } from './../src/index.js';

void tap.test('basic functionality', t => {
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

	setTimeout(() => {
		t.equal(el.innerHTML, `<div>lol</div>`);
	}, 100);
});
