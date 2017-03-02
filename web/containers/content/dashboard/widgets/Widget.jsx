import React				from 'react';
import {connect}			from 'react-redux';

import RefreshButton		from 'web/components/RefreshButton';

const Widget = ({children, lastUpdated, isFetching, handleRefreshClick}) => {
	return (
		<section className='card dynamic'>
			<div className='card-block'>
				{children}
			</div>
			<footer className='card-footer text-muted'>
				<RefreshButton date={lastUpdated} loading={isFetching} refreshHandler={handleRefreshClick} />
			</footer>
		</section>
	);
};

export default connect()(Widget);