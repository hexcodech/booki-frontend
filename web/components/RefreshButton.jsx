import React
       from 'react';
import TimeAgo
       from 'react-timeago';

import CSSModules
       from 'react-css-modules';
import styles
       from './RefreshButton.scss';

const RefreshButton = ({date, loading, refreshHandler}) => {

	return (
		<span>
			<a href='#' onClick={refreshHandler}>
				<i
					styleName={loading ? 'icon-spinning': 'icon'}
					className='material-icons'
				>refresh</i>
			</a>

			{' '}

			{date &&
				<span>
					Refreshed{' '}
					<TimeAgo
						date={date}
						formatter={(value, unit, suffix) => {
							if(unit === 'second'){
								return 'just now';
							}else{
								return value +' '+ unit + (value > 1 ? 's' : '') + ' ' + suffix;
							}
						}}
					/>
				</span>
			}
		</span>
	);
};

export default CSSModules(RefreshButton, styles);
