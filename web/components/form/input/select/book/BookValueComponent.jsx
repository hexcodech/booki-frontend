import React from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import "./BookComponent.scss";

const BookValueComponent = ({ value: book }) => {
	return (
		<div styleName="book-value">
			{book.thumbnail && <img src={book.thumbnail} width="38" height="57" />}
			{book.title &&
				<span styleName="description">
					<span styleName="title">{book.title}</span>
					{" "}
					<span styleName="page-count">({book.pageCount} S.)</span>
				</span>}
			{!book.title && <span>{book.value}</span>}
		</div>
	);
};

export default BookValueComponent;
