> (Currently in development and not production-ready)

<br/>

<h1>
  react-sus
  <a href="https://bundlephobia.com/result?p=react-sus"><img src="https://img.shields.io/bundlephobia/minzip/react-sus?label=bundle%20size&style=flat&colorA=000000&colorB=000000"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/react-sus"><img src="https://img.shields.io/npm/v/react-sus?style=flat&colorA=000000&colorB=000000"/></a>
</h1>
<h3></h3>

```bash
npm i react-sus
```

Minimal Suspense-based data-fetching

## Example

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

## Inspirations

This project seeks to combine the simplicity of swr with react-query's feature set and suspend-react's suspense support.

- [swr](https://github.com/vercel/swr)
- [suspend-react](https://github.com/pmndrs/suspend-react)
- [react-query](https://github.com/tannerlinsley/react-query)

## Related Projects

- [snowstorm](https://github.com/explodingcamera/snowstorm) - The lightning-fast and minimalist React Tool
