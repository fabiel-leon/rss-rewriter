# rss-rewriter

```sh
npm i rss-rewriter
```

```js
const { rewriter } = require("rss-rewriter");

const items = await rewriter({
  source: "https://es.cointelegraph.com/rss", // source url or stream
  site: "https://pricecrypto.surge.sh/redirect", // redirection page 
  title: "My Rss title",
  description: "My Rss description",
  format: "rss", // rss|atom|json  , default is rss
  array: true, // return array of items instead of string result in defined format
});

//
console.log(items);
/*
[
     { title: 'Récord histórico de ballenas de bitcoin después de 4 años',
    link: 'https://pricecrypto.surge.sh/redirect?title=R%C3%A9cord+hist%C3%B3rico+de+ballenas+de+bitcoin+despu%C3%A9s+de+4+a%C3%B1os&url=https%3A%2F%2Fwww.criptonoticias.com%2Fanalisis-investigacion%2Frecord-historico-ballenas-bitcoin-despues-4-anos%2F&image_url=https%3A%2F%2Fmk0criptonoticijjgfa.kinstacdn.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fballenas-inversionistas-bitcoin-560x315.jpg',
    description: '<a href="https://pricecrypto.surge.sh/redirect?title=R%C3%A9cord+hist%C3%B3rico+de+ballenas+de+bitcoin+despu%C3%A9s+de+4+a%C3%B1os&amp;url=https%3A%2F%2Fwww.criptonoticias.com%2Fanalisis-investigacion%2Frecord-historico-ballenas-bitcoin-despues-4-anos%2F&amp;image_url=https%3A%2F%2Fmk0criptonoticijjgfa.kinstacdn.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fballenas-inversionistas-bitcoin-560x315.jpg"><img width="560" height="315" src="https://mk0criptonoticijjgfa.kinstacdn.com/wp-content/uploads/2020/11/ballenas-inversionistas-bitcoin-560x315.jpg" alt="R&#xE9;cord hist&#xF3;rico de ballenas de bitcoin despu&#xE9;s de 4 a&#xF1;os"/></a><p>Casi 2.000 entidades tienen m&#xE1;s de 1.000 bitcoins cada una. Algunas son reconocidos inversionistas institucionales.</p>\n<p><a href="https://pricecrypto.surge.sh/redirect?title=R%C3%A9cord+hist%C3%B3rico+de+ballenas+de+bitcoin+despu%C3%A9s+de+4+a%C3%B1os&amp;url=https%3A%2F%2Fwww.criptonoticias.com%2Fanalisis-investigacion%2Frecord-historico-ballenas-bitcoin-despues-4-anos%2F&amp;image_url=https%3A%2F%2Fmk0criptonoticijjgfa.kinstacdn.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fballenas-inversionistas-bitcoin-560x315.jpg">Leer m&#xE1;s</a></p>',
    date: 2020-11-28T17:28:07.000Z,
    categories: undefined,
    image: 'https://mk0criptonoticijjgfa.kinstacdn.com/wp-content/uploads/2020/11/ballenas-inversionistas-bitcoin-560x315.jpg',
    views: 0,
    likes: 0 },
    ...
    ]
*/
```
