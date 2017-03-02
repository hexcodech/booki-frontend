import React				from 'react';
import {connect}			from 'react-redux';
import bindAll				from 'lodash/bindAll';

import {Doughnut}			from 'react-chartjs-2';

import {formatBytes}		from 'core/utilities/format';

import {invalidateSystemStats, fetchSystemStatsIfNeeded}	
							from 'app/actions/system-stats';
							
import Widget				from 'web/containers/content/dashboard/widgets/Widget';

class MemoryStatsWidget extends React.Component{
	
	constructor(props){
		super(props);
		
		bindAll(this, ['componentDidMount', 'handleRefreshClick']);
	}
	
	componentDidMount() {
		const {dispatch, accessToken} = this.props;
		
		dispatch(fetchSystemStatsIfNeeded(accessToken));
	}
	
	handleRefreshClick(e) {
		e.preventDefault();
		
		const {dispatch, accessToken} = this.props;
		
		dispatch(invalidateSystemStats());
		dispatch(fetchSystemStatsIfNeeded(accessToken));
	}
	
	
	render(){
		
		const {systemStats} = this.props;
		
		return (
			<Widget lastUpdated={systemStats.lastUpdated} isFetching={systemStats.isFetching} handleRefreshClick={this.handleRefreshClick}>
				<Doughnut
					data={
						{
							labels: [
						        'Used Heap',
						        'Unused Heap',
						        'Other processes',
						        'Free Memory',
						    ],
						    datasets: [
						        {
						            data: [
						            	systemStats.memoryUsage.heapUsed,
						            	systemStats.memoryUsage.heapTotal - systemStats.memoryUsage.heapUsed,
						            	systemStats.totalMemory - systemStats.freeMemory - systemStats.memoryUsage.rss,
						            	systemStats.freeMemory
						            ],
						            backgroundColor: [
						            	'#FFE7C5',
						            	'#FFD69B',
						            	'#FFC676',
						            	'#BF7F26'
						            ],
						            hoverBackgroundColor: [
						            	'#FFE7C5',
						            	'#FFD69B',
						            	'#FFC676',
						            	'#BF7F26'
						            ]
						        }
						    ]
						}
					}
					width={300}
					height={200}
					options={
						{
							title: {
								text: 'Memory',
								display: true
							},
							maintainAspectRatio: false,
							legend: {
							    position: 'bottom'
						    },
						    tooltips: {
							    callbacks: {
								    label: (tooltip, data) => {
									    return data.labels[tooltip.index] + ' (' +
									    formatBytes(data.datasets[0].data[tooltip.index]) + ')';
								    }
							    }
						    }
						}
					}
					/>
			</Widget>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken: state.app.authentication.accessToken.token,
		systemStats: state.app.dashboard.systemStats
	};
}

export default connect(mapStateToProps)(MemoryStatsWidget);