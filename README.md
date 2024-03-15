# Remix Suspense

This example shows how to use `<Suspense key={location.pathname}>` to ensure
that the fallback component is displayed when navigating to the same route
component but with different URL. For example '/defer/123' => `/defer/456`

If you're rendering the same route but with different data, Remix does not
unmount your component before rendering. Just like in regular React, it's
fetching the data and updating context and React is responsible for rendering.

To ensure the Suspense boundary is unmounted on route change, I recommend
setting a key equal to the current path.

```ts
const location = useLocation()
return <Suspense key={location.pathname}>...
```
