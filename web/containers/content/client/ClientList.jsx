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

import {invalidateClients, fetchClientsIfNeeded}
       from 'core/actions/client';

import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';

class ClientList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handleClientRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchClientsIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateClients());
		dispatch(fetchClientsIfNeeded(accessToken));
	}

	handleClientRowClick(e){
		this.props.dispatch(
			push(
				'/client/' + e.currentTarget.getAttribute('data-client-id') + '/'
			)
		);
	}

	render(){

		const {clients} = this.props;

		return (
			<div className='client-list'>
        <Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the client list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new client.'
          >
						<Link to={'/client/new/'}>
							<i className='material-icons'>add</i>
						</Link>
					</li>
				</Actions>

				<Card>
					<Table interactive={true}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Trusted</th>
							</tr>
						</thead>
						<tbody>
							{clients.map((client, index) => {

								return (
                  <tr key={index}
										onClick={this.handleClientRowClick}
										data-client-id={client.id}
                  >
										<td>{client.id}</td>
										<td>{client.name}</td>
										<td>
                      <span
												className='hint-right-middle hint-anim'
												data-hint={client.trusted ? 'Trusted' : 'Untrusted'}
                      >{
                        client.trusted ?
                        (<i className='material-icons'>
                          verified_user
                        </i>) :
                        (<i className='material-icons'>
                          lock_open
                        </i>)
                      }
											</span>
										</td>
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
		clients     : state.app.clients
	};
}

export default connect(mapStateToProps)(ClientList);
