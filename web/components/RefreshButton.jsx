import React				from 'react';
import {connect}			from 'react-redux';
import TimeAgo				from 'react-timeago';

const RefreshButton = ({date, loading, refreshHandler}) => {
	
	return (
		<span className=''>
			<a href='#' onClick={refreshHandler}><i className={loading ? 'material-icons bottom spinning': 'material-icons bottom'}>refresh</i></a>{' '}
			{date &&
				<span>
					Refreshed{' '}
					<TimeAgo
						date={date}
						formatter={(value, unit, suffix) => {
							if(unit === 'second'){
								return 'just now';
							}else{
								return value + ' ' + unit + (value > 1 ? 's' : '') + ' ' + suffix;
							}
						}}
					/>
				</span>
			}
		</span>
	);
};

export default connect()(RefreshButton);