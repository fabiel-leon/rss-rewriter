const fs = require('fs');
const assert = require('assert');
const small = require('./small');
const { rewriter } = require('../index');

describe('RSS Creator', () => {
  it('Google', async () => {
    const google = fs.createReadStream('tests/google.rss');
    const items = await rewriter({
      source: google,
      site: 'https://pricecrypto.surge.sh/redirect',
      title: 'Pricecrypto',
      description: 'JJJJ',
      format: 'json',
      array: true,
    });
    // console.log(small(items));
    assert.equal(items.length, 8);
  });
  it('Cripto', async () => {
    const google = fs.createReadStream('tests/feeder-cripto.rss');
    const items = await rewriter({
      source: google,
      site: 'https://pricecrypto.surge.sh/redirect',
      title: 'Pricecrypto',
      description: 'JJJJ',
      format: 'json',
      array: true,
    });
    console.log(small(items));
    assert.equal(items.length, 10);
  });
  it('Cointelegraph', async () => {
    const google = fs.createReadStream('tests/cointelegraph.rss');
    const items = await rewriter({
      source: google,
      array: true,
      site: 'https://pricecrypto.surge.sh/redirect',
      title: 'Pricecrypto',
      description: 'JJJJ',
      format: 'json',
    });
    // console.log(small(items));
    assert.equal(items.length, 30);
  });
  it('FeedInformer', async () => {
    const google = fs.createReadStream('tests/feeder.rss');
    const items = await rewriter({
      source: google,
      array: true,
      site: 'https://pricecrypto.surge.sh/redirect',
      title: 'Pricecrypto',
      description: 'JJJJ',
      format: 'json',
    });
    // console.log(small(items));
    assert.equal(items.length, 50);
  });
  it('Trends', async () => {
    const google = fs.createReadStream('tests/trends.xml');
    const items = await rewriter({
      source: google,
      array: true,
      site: 'https://pricecrypto.surge.sh/redirect',
      title: 'Pricecrypto',
      description: 'JJJJ',
      format: 'json',
    });
    // console.log(small(items));
    // small(items).forEach((it) => { console.log(it); assert.ok(it.image, 'No imagen'); });
    assert.equal(items.length, 37);
  });
});
