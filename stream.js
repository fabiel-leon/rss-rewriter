const request = require('request');

module.exports = (feedUrl) => new Promise((resolve, reject) => {
  /**
     *
     * @param {Response} res
     */
  function requestOnResponse(res) {
    const statusOk = 200;
    if (res.statusCode !== statusOk) {
      const error = {
        type: 'fetch_url_error',
        message: `This URL returned a ${res.statusCode} status code`,
        feed: feedUrl,
      };
      reject(error);
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
      headers: {
        access: 'text/html,application/xhtml+xml,application/xml,text/xml',
      },
    })
    .on('response', requestOnResponse)
    .on('error', requestOnError);
});
