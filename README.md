# react-sus

Minimal Suspense-based data-fetching

> Currently in development and not production-ready

```tsx
import React, { Suspense } from "react";
import { createRoot } from "react-dom";
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
