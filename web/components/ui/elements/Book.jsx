import React from "react";

import "./Book.scss";

const Book = props => {
	const id = props.id ? props.id : Math.random().toString().substring(2);
	const url = props.url
		? props.url
		: "https://source.unsplash.com/228x318/?book";

	return (
		<div styleName="book">
			<div styleName="overlay" />
			<img styleName="image" src={url} />
		</div>
	);
};

export default Book;
