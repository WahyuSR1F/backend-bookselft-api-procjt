// router handling  for aplication

const {
  addBooksHandler,
  getAllBooksHandler,
  getDetailBookHandler,
  editBooksHandler,
  deleteBooksHandler,
} = require('./handler');

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
    // handler get detail book
    handler: getDetailBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    // handler to Update book
    handler: editBooksHandler,

  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    // handler to Delete book
    handler: deleteBooksHandler,
  },

];

module.exports = routes;
