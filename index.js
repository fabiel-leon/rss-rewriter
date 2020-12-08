const { URL } = require('url');
const stream = require('./stream');
const rss = require('./rss');
const feedparser = require('./feedparser');

module.exports = {
  async rewriter({
    source,
    site,
    ...rest
  }) {
    if (!source) { throw new Error('Missing source url or stream'); }
    if (!site) { throw new Error('Missing destination site url'); }
    let url = false;
    try {
      url = new URL(source).href;
    } catch (error) {
      console.info(error.message);
    }
    let result;
    if (url) {
      result = await stream(url);
    }
    const items = await feedparser(result || source);
    return rss({ items, site, ...rest });
  },
  stream,
  rss,
  feedparser,
};
