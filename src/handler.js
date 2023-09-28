// handler function to handler for any request from aplication

const { nanoid } = require('nanoid');

// storage array
const bookStorage = require('./booksStorage');

const addBooksHandler = (request, h) => {
  // get atribut from request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // validation for name books is required

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // regerate id with nanoid
  const id = nanoid(16);

  // properti createdAt and UpdateAt must same, because created new books
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // there we have all propertis
  // next put in newBooks variable

  // finished variable get to know that books has read or not
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }

  // validate value readPage !> pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Push to bookStorage
  bookStorage.push(newBooks);

  // lest to check that data has success to push
  const isSuccess = bookStorage.filter((book) => book.id === id);

  // if Success
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // fail
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// eksports
module.exports = {
  addBooksHandler,
};
