/** small news format */

module.exports = (array) => array.map(({
  title, link, description, date, categories, image,
}) => ({
  title,
  link,
  description,
  date,
  categories,
  image,
  views: 0,
  likes: 0,
  // short: '',
  // fb:''
}));
