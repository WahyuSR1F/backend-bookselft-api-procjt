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
  // get all atributs
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
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const nonCaseSensitive = (attribute, arrayTarget) => {
  const lowerCaseKeyword = attribute.toLowerCase();
  const resultBooks = arrayTarget.filter((item) => (
    item.name.toLowerCase().includes(lowerCaseKeyword)
  ));

  return resultBooks;
};

const addValueHandler = (Value) => {
  let badValue;
  let isValue;
  // validate
  if (!Value === '1' && !Value === '0') {
    badValue = undefined;
    return badValue;
  }
  // validate value of reading
  if (Value === '1') {
    isValue = true;
  } else if (Value === '0') {
    isValue = false;
  }

  // lest found
  return isValue;
};

const getAllBooksHandler = (request, h) => {
  // query parameter name
  const { name } = request.query;
  // query parameter read
  const { reading } = request.query;
  // query parameter finish
  const { finished } = request.query;

  // Mengambil nilai parameter 'name' dari query
  // if have query parameter get name
  if (name) {
    const resultBooks = nonCaseSensitive(name, bookStorage);
    const books = resultBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    // success
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }
  // if query is reading
  if (reading) {
    // call function
    const isReading = addValueHandler(reading);

    // validate, is undifined ?
    if (isReading === undefined) {
      // Jika 'reading' tidak valid, kembalikan pesan error
      const response = h.response({
        status: 'error',
        message: 'Invalid value for "reading" parameter. Use 0 or 1.',
      });
      return response.code(400); // Bad Request
    }
    const resultBooks = bookStorage.filter((item) => item.reading === isReading);
    // get atribut books
    const books = resultBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    // success
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }
  // if query is finished not-finished
  if (finished) {
    const isFinished = addValueHandler(finished);
    // validate, is undefined ?
    if (isFinished === undefined) {
      // Jika 'reading' tidak valid, kembalikan pesan error
      const response = h.response({
        status: 'error',
        message: 'Invalid value for "reading" parameter. Use 0 or 1.',
      });
      return response.code(400); // Bad Request
    }
    const resultBooks = bookStorage.filter((item) => item.finished === isFinished);
    const books = resultBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    // success
    const response = h.response({
      status: 'success',
      message: 'buku ditemukan!!',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  // if not have query parameter
  // Logika untuk mencari buku dengan nama yang sesuai

  const resultBooks = bookStorage;
  // get atribut will send in Api
  const books = resultBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  // success
  const response = h.response({
    status: 'success',
    message: 'buku ditemukan!!',
    data: {
      books,
    },
  });

  response.code(200);
  return response;
};

const getDetailBookHandler = (request, h) => {
  // get id in path parameter
  const { bookId } = request.params;
  // get query parameter from url
  // get object with id result with filter
  const resultBook = bookStorage.filter((books) => books.id === bookId)[0];
  const book = resultBook;

  // lets to check there books has found

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      message: 'buku ditemukan!!',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  // fail
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBooksHandler = (request, h) => {
  const { bookId } = request.params;
  // get atribut to update
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // validate property name is not null

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // validate for readPage !> pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // lest change for time in updateAt
  const updatedAt = new Date().toISOString();

  // find id target
  const index = bookStorage.findIndex((book) => book.id === bookId);

  // validate, do you find of id in bookStorage ?

  if (index !== -1) {
    // lest to update
    bookStorage[index] = {
      ...bookStorage[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    // success
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }
  // fail
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBooksHandler = (request, h) => {
  // get id form url
  const { bookId } = request.params;

  const index = bookStorage.findIndex((book) => book.id === bookId);

  // lest validate the index get value -1 or not
  if (index !== -1) {
    // lest to delete
    bookStorage.splice(index, 1);
    // give feeback
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  // fail

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Opsional Requirment
const getBooksNameHandler = (request, h) => {
  const { name } = request.query; // Mengambil nilai parameter 'name' dari query

  // Logika untuk mencari buku dengan nama yang sesuai
  const filteredBooks = bookStorage.filter((book) => (
    book.name.toLowerCase().includes(name.toLowerCase())
  ));

  // Membuat respons sesuai dengan hasil pencarian
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });

  response.code(200);
  return response;
};

// eksports
module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getDetailBookHandler,
  editBooksHandler,
  deleteBooksHandler,
  getBooksNameHandler,
};
