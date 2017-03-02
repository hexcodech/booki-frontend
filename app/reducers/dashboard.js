import {combineReducers}	from 'redux';

const systemStats = (state =
{
	cpus						: [],
	cpuUsage					: {},
	
	totalMemory					: 0,
	freeMemory					: 0,
	memoryUsage					: {},
	
	loadAverage					: [],
	
	systemUptime				: 0,
	processUptime				: 0,
	
	os							: '',
	platform					: '',
	
	hostname					: '',
	pid							: 0,
	
	nodeVersion					: '',
	
	bandwidth					: {},
	
	lastUpdated					: 0,
	isFetching					: false,
	didInvalidate				: false
	
}, action) => {
		
	switch(action.type){
		case 'INVALIDATE_SYSTEM_STATS':
			return {
				...state,
				didInvalidate: true
			};
		case 'REQUEST_SYSTEM_STATS':
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case 'FAIL_SYSTEM_STATS_REQUEST':
			
			console.log(action.error);
		
			return {
				...state,
				isFetching: false
			};
		case 'RECEIVE_SYSTEM_STATS':
			return {
				...state,
				...action.systemStats,
				
				lastUpdated: action.receivedAt,
				
				isFetching: false,
				didInvalidate: false
			};
		default:
			return state;
		
	};
};

export default combineReducers({
	systemStats
});