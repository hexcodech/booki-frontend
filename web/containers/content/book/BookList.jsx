import React				from 'react';
import {connect}			from 'react-redux';
import {Link}				from 'react-router';
import {push}				from 'react-router-redux';
import bindAll				from 'lodash/bindAll';

import {invalidateBooks, fetchBooksIfNeeded}
							from 'core/actions/book';

import RefreshButton		from 'web/components/RefreshButton';

class BookList extends React.Component{
	
	constructor(props){
		super(props);
		
		bindAll(this, ['componentDidMount', 'handleRefreshClick', 'handleBookRowClick']);
	}
	
	componentDidMount() {
		const {dispatch, accessToken} = this.props;
		
		dispatch(fetchBooksIfNeeded(accessToken));
	}
	
	handleRefreshClick(e) {
		e.preventDefault();
		
		const {dispatch, accessToken} = this.props;
		
		dispatch(invalidateBooks());
		dispatch(fetchBooksIfNeeded(accessToken));
	}
	
	handleBookRowClick(e){
		this.props.dispatch(
			push('/dashboard/book/' + e.currentTarget.getAttribute('data-book-id') + '/')
		);
	}
	
	render(){
		
		const {books} = this.props;
		
		return (
			<div className='book-list'>
				<ul className='list-inline list-navigation'>
					<li className='list-inline-item hint-bottom-middle hint-anim' data-hint='Refresh the book list.'>
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
					<li className='list-inline-item hint-bottom-middle hint-anim' data-hint='Add a new book.'>
						<Link to={'/dashboard/book/new/'} className='max-block'>
							<i className='material-icons bottom'>add</i>
						</Link>
					</li>
				</ul>
				
				<hr/>
				
				<table className='styled clickable-rows'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => {
							return <tr key={index} onClick={this.handleBookRowClick} data-book-id={book._id}>
								<td>{book._id}</td>
								<td>{book.title}</td>
							</tr>;
						})}
					</tbody>
				</table>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken	: state.app.authentication.accessToken.token,
		books		: state.app.books
	};
}

export default connect(mapStateToProps)(BookList);