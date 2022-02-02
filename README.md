<h1>
  react-sus
  <a href="https://bundlephobia.com/result?p=react-sus@latest"><img src="https://img.shields.io/bundlephobia/minzip/react-sus@latest?label=bundle%20size&style=flat&colorA=000000&colorB=000000"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/react-sus"><img src="https://img.shields.io/npm/v/react-sus?style=flat&colorA=000000&colorB=000000"/></a>
</h1>
<h3></h3>

```bash
npm i react-sus
```

Minimal Suspense-based data-fetching (Currently in development and not production-ready)

## Example

<table>
<tr>
<td> TypeScript </td>
</tr>
<tr>
<td>

```tsx
import { Suspense } from "react";
import { sus } from "react-sus";

interface User {
  username: string;
}

const SomeComponent = ({ userID }: { userID: string }) => {
  const data = sus<User>(`https://api.example.com/user/${userID}`);
  return <div>{data.username}</div>;
};

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SomeComponent userID={"example"} />
  </Suspense>
);
```

</td>
</tr>
</table>

## API

```tsx
// simplified api

type sus = <Data>(
  key: Key, // anything that can be serialized to a string
  fetcher?: Fetcher | undefined,
  userConfig?: Config
) => Await<Data>;

interface Config {
  fetcher: Fetcher; // any promise or fetch-like function
  cacheProvider: Cache; // any Map-like function
}
```

Any Component using this function needs to be wrapped in an `<Suspense></Suspense>` block. Once the promise is started, control will be given back to react until the promise resolves and the actual data is returned.

The key acts as the key for caching the results, so be sure to not reuse the same cache keys for different requests (only relevant when they both use the same cacheProvider).

When an error occours, it will bubble up to the next `<ErrorBoundary/>`. Because of this, the return value is guaranteed to be valid.

## Configuration

### Context

> will be available at release

### Pre-Loading

> will be available at release

### Cache Busting

> will be available at release

## Inspirations

This project seeks to combine the simplicity of swr with react-query's feature set and suspend-react's suspense support.

- [swr](https://github.com/vercel/swr)
- [suspend-react](https://github.com/pmndrs/suspend-react)
- [react-query](https://github.com/tannerlinsley/react-query)

## Related Projects

- [snowstorm](https://github.com/explodingcamera/snowstorm) - The lightning-fast and minimalist React Tool

```

```
