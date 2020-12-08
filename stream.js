const request = require('request');

module.exports = (feedUrl) => new Promise((resolve, reject) => {
  /**
     *
     * @param {Response} res
     */
  function requestOnResponse(res) {
    const statusOk = 200;
    if (res.statusCode !== statusOk) {
      const message = `This URL ${feedUrl} returned  a ${res.statusCode} status code`;
      reject(new Error(message));
    } else {
      const stream = this;
      stream.pause();
      resolve(stream);
    }
  }

  function requestOnError(responseError) {
    const error = {
      type: 'fetch_url_error',
      message: `Cannot connect to ${feedUrl}`,
      feed: feedUrl,
      responseError,
    };
    reject(error);
  }

  request
    .get({
      url: feedUrl,
      gzip: true,
      headers: {
        'cache-control': 'no-cache',
        'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,pt;q=0.7,ca;q=0.6,es-419;q=0.5,es;q=0.4',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        dnt: '1',
        pragma: ' no-cache',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    .on('response', requestOnResponse)
    .on('error', requestOnError);
});
