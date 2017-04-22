import React
       from 'react';
import {connect}
       from 'react-redux';

import CSSModules
       from 'react-css-modules';
import styles
       from './BookComponent.scss';

const BookOptionComponent = ({
	option: book, isFocused, onFocus, onSelect
}) => {

	const handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();

		onSelect(book, event);
	},
	handleMouseEnter = (event) => {
		onFocus(book, event);
	},
	handleMouseMove = (event) => {
		if(isFocused){return;}
		onFocus(book, event);
	};

  return (
    <div
      styleName='book-option'
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {book.thumbnail &&
        <img src={book.thumbnail} width='38' height='57'/>
      }
      {book.title &&
        <span styleName='description'>
          <span styleName='title'>{book.title}</span>
          {' '}
          <span styleName='page-count'>({book.pageCount} S.)</span>
        </span>
      }
      {!book.title && <span>{book.value}</span>}
    </div>
  );
};

export default CSSModules(BookOptionComponent, styles);
