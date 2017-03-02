import {fetchApi} from 'core/utilities/rest';

export const invalidateSystemStats = () => {
	return {
		type: 'INVALIDATE_SYSTEM_STATS'
	};
}

const requestSystemStats = (accessToken) => {
	return {
		type: 'REQUEST_SYSTEM_STATS',
		accessToken
	};
}

const failSystemStatsRequest = (error) => {
	return {
		type: 'FAIL_SYSTEM_STATS_REQUEST',
		error
	}
}

const receiveSystemStats = (systemStats, receivedAt) => {
	return {
		type: 'RECEIVE_SYSTEM_STATS',
		systemStats,
		receivedAt
	};
}

const fetchSystemStats = (accessToken) => {
	return (dispatch) => {
		
		dispatch(
			requestSystemStats(accessToken)
		);
		
		return fetchApi('system/stats', 'GET', {}, accessToken)
		.then((stats) => {
			
			dispatch(
				receiveSystemStats(stats, Date.now())
			);
			
		}).catch((error) => {
			
			dispatch(
				failSystemStatsRequest(error)
			);
			
			dispatch(push('/'));
		});
	};
}

const shouldFetchSystemStats = (state, accessToken) => {
	const stats = state.app.dashboard.systemStats;
	
	if(stats.isFetching){
		return false;
	}else if(stats.lastUpdated === 0){
		return true;
	}else{
		return stats.didInvalidate;
	}
}

export const fetchSystemStatsIfNeeded = (accessToken) => {
	
	return (dispatch, getState) => {
		if(shouldFetchSystemStats(getState(), accessToken)){
			// Dispatch a thunk from thunk!
			return dispatch(fetchSystemStats(accessToken));
		}else{
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	}
}