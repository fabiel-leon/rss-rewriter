# rss-rewriter

```shell
npm i rss-rewriter
```

```js
const { rewriter } = require("");
const items = await rewriter({
  source: "https://es.cointelegraph.com/rss", // source url or stream
  site: "https://pricecrypto.surge.sh/redirect", // redirection page 
  title: "My Rss title",
  description: "My Rss description",
  format: "rss", // rss|atom|json  , default is rss
  array: true, // return array of items instead of string result in defined format
});
```
