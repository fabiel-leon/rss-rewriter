const { Feed } = require('feed');
const { URL } = require('url');
// const request = require("request");
const Entities = require('html-entities').AllHtmlEntities;
const cheerio = require('cheerio');

const entities = new Entities();
// const personImage = "https://thispersondoesnotexist.com/image";
module.exports = async (
  {
    items,
    site,
    urlParam,
    title,
    description,
    lang,
    format,
    array,
  },
) => {
  /* lets create an rss feed */
  const today = new Date();
  const feed = new Feed({
    title,
    description,
    id: site,
    link: site,
    docs: site,
    updated: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    language: lang || 'en',
    copyright: 'No rights reserved',
    generator: 'rss-rewriter',
  });
  const allPromises = items.map(
    ({
      title: datatitle,
      description: datadescription,
      date,
      link,
      image,
    }) => {
      // url final del sitio de anuncios para esta entrada
      const siteURl = new URL(site);
      siteURl.searchParams.append('title', datatitle);
      // siteURl.searchParams.append('date', date);

      // obtener url de la entrada , en caso de que sea uan fuente de
      // google obtener la url de la entrada del parametro url
      const decodedLink = entities.decode(link);

      const linkURL = new URL(decodedLink);
      const entryURL = urlParam
        ? linkURL.searchParams.get(urlParam)
        : decodedLink;

      // console.log({ link, decodedLink });
      siteURl.searchParams.append('url', entryURL); // search = `url=${page}`;

      const result = {
        title: datatitle,
        date,
      };

      if (image) {
        siteURl.searchParams.append('image_url', image);
        result.image = image;
      }

      // reescribir las url de los ahref
      const $ = cheerio.load(datadescription, { xmlMode: true });
      $('a').toArray().forEach((ele) => {
        const $$ = $(ele);
        const href = $$.attr('href');
        const customURL = new URL(siteURl.href);
        customURL.searchParams.set('url', href);
        $$.attr('href', customURL.href);
      });

      result.description = $.html();
      result.link = siteURl.href;
      return Promise.resolve(feed.addItem(result));
    },
  );
  await Promise.all(allPromises);
  if (array) return feed.items;
  switch (format) {
    case 'atom':
      return feed.atom1();
    case 'json':
      return feed.json1();
    default:
      return feed.rss2();
  }
};
