import React				from 'react';
import {connect}			from 'react-redux';

const BookValueComponent = ({lookedUpBooks, value}) => {
	
	const book = lookedUpBooks.filter((book) => {
		return book._id === value.value;
	})[0];
	
	if(book){
		return (
			<div className='book-select book-value'>
				<img src={book.images.original} width='38' height='57'/>
				<span className='title'>{book.title}</span>
			</div>
		);
	}else{
		return (
			<div className='book-select book-value'>
				{value.value}
			</div>
		);
	}
	
	
};

const mapStateToProps = (state) => {
	return {
		lookedUpBooks	: state.app.lookedUpBooks,
	};
};

export default connect(mapStateToProps)(BookValueComponent);