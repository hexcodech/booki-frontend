import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Book
       from 'web/containers/content/book/Book';
import BookList
       from 'web/containers/content/book/BookList';

const BookRouter = () => {
  return (
    <div>
      <Route path='/book/list' component={BookList} />
      <Route path='/book/:id' component={Book} />
    </div>
  );
};


export default BookRouter;
