import React
       from 'react';
import {connect}
       from 'react-redux';
import {Link}
       from 'react-router-dom';
import {push}
       from 'react-router-redux';
import bindAll
       from 'lodash/bindAll';

import {invalidateBooks, fetchBooksIfNeeded}
       from 'core/actions/book';

import RefreshButton
       from 'web/components/RefreshButton';
import {Table}
       from 'web/components/layout/Table';
import Actions
       from 'web/components/layout/Actions';
import Card
      from 'web/components/layout/Card';

class BookList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 'handleRefreshClick', 'handleBookRowClick'
		]);
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
			push('/book/' + e.currentTarget.getAttribute('data-book-id') + '/')
		);
	}

	render(){

		const {books} = this.props;

		return (
			<div className='book-list'>
				<Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the book list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new book.'
          >
						<Link to={'/book/new/'}>
							<i className='material-icons'>add</i>
						</Link>
					</li>
				</Actions>

        <Card>
          <Table interactive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr
                    key={index}
                    onClick={this.handleBookRowClick}
                    data-book-id={book.id}
                  >
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken : state.app.authentication.accessToken.token,
		books       : state.app.books
	};
}

export default connect(mapStateToProps)(BookList);
