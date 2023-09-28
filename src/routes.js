// router handling  for aplication

const { addBooksHandler, getAllBooksHandler, getDetailBookHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    // handler for addbooks
    handler: addBooksHandler,

  },
  {
    method: 'GET',
    path: '/books',
    // handler for get all
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    // handler get detail books
    handler: getDetailBookHandler,
  },
];

module.exports = routes;
