// router handling  for aplication

const { addBooksHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    // handler for addbooks
    handler: addBooksHandler,

  },
];

module.exports = routes;
