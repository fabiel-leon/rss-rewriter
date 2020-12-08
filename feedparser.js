/* eslint-disable require-jsdoc */
const FeedParser = require('feedparser');
const Entities = require('html-entities').AllHtmlEntities;
const cheerio = require('cheerio');
const { URL } = require('url');

const entities = new Entities();

const buildItem = (
  {
    'ht:news_item_title': ptitle,
    'ht:news_item_url': purl,
    'ht:news_item_snippet': pdescription,
  },
  picture,
  cat,
) => {
  const { '#': title } = ptitle;
  const { '#': link } = purl;
  const { '#': description } = pdescription;
  const image = picture && picture['#'] ? picture['#'] : null;
  const result = {
    title: entities.decode(title),
    link: entities.decode(link),
    description: entities.decode(description),
    date: new Date(),
    categories: [cat],
  };

  if (image) {
    result.image = image;
  }
  return result;
};

module.exports = (stream, multiple = true) => new Promise((resolve, reject) => {
  try {
    const parser = new FeedParser();
    const items = [];
    parser.on('error', (errr) => {
      const error = {
        type: 'invalid_feed',
        message: 'Cannot parse feed XML',
        stack: errr,
      };
      reject(error);
    });
    parser.on('readable', () => {
      const item = parser.read();
      if (item) {
        const newsItems = item['ht:news_item'];
        /* si es de la fuente de google trends */
        if (newsItems) {
        /* si es un array */
          if (newsItems instanceof Array) {
            if (multiple) {
              const theItems = newsItems.map((it) => buildItem(it, item['ht:picture'], item.title));
              items.push(...theItems);
            } else {
              const pop = newsItems.pop();
              items.push(buildItem(pop, item['ht:picture'], item.title));
            }
          } else {
          /* si newItems no es un array */
            items.push(buildItem(newsItems, item['ht:picture'], item.title));
          }
        } else {
          item.title = entities.decode(item.title);
          item.description = entities.decode(item.description);
          item.link = entities.decode(item.link);

          if (item.link.startsWith('https://www.google.com/url')) {
            const linkURL = new URL(item.link);
            item.link = linkURL.searchParams.get('url');

            // solo añdir categoria en caso se que sea proveniente de google alerts
            if (item.categories && !item.categories.length && item.meta.title) {
              item.categories = [
                item.meta.title
                  .replace('Google Alert - ', '')
                  .replace('Alerta de Google: ', ''),
              ];
            }
          }
          // si la imagen es un objeto convertirla a una propiedad string
          if (item.image && item.image.url) {
            item.image = item.image.url;
          } else if (item.enclosures && Array.isArray(item.enclosures)) {
          // si la imagen esta dentro de la propiedad enclosures obtenerla de alli
            const enc = item.enclosures.find(
              (it) => it.url && it.type && it.type.startsWith('image'),
            );
            if (enc) {
              item.image = enc.url;
            } else {
            // en otro caso obtener la imagen de la descripcion
              const $ = cheerio.load(item.description);
              const img = $('img').first();
              if (img.length) {
                item.image = img.attr('src');
              } else {
                delete item.image;
              }
            }
          }
          items.push(item);
        }
      }
    });
    parser.on('end', () => {
      resolve(items);
    });
    stream.pipe(parser);
    stream.resume();
  } catch (error) {
    reject(error);
  }
});
