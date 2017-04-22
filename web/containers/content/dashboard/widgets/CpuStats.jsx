import React
       from 'react';
import {connect}
       from 'react-redux';
import bindAll
       from 'lodash/bindAll';

import {Doughnut}
       from 'react-chartjs-2';

import {invalidateSystemStats, fetchSystemStatsIfNeeded}
       from 'app/actions/system-stats';

import Widget
       from 'web/containers/content/dashboard/widgets/Widget';

class CpuStatsWidget extends React.Component{

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

		let labels = [], data = [], colors = ['#FFE7C5', '#FFD69B', '#FFC676', '#DEA14B', '#BF7F26'];

		for(let key in systemStats.cpuAverage){
			labels.push(key);
			data.push(systemStats.cpuAverage[key]);
		}

		const cpuTotal = data.reduce((a, b) => a+b, 0);

		return (
			<Widget lastUpdated={systemStats.lastUpdated} isFetching={systemStats.isFetching} handleRefreshClick={this.handleRefreshClick}>
				<Doughnut
					data={
						{
							labels: labels,
						    datasets: [
						        {
						            data: data,
						            backgroundColor: colors,
						            hoverBackgroundColor: colors
						        }
						    ]
						}
					}
					width={300}
					height={200}
					options={
						{
							title: {
								text: 'CPU',
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
									    Math.round(data.datasets[0].data[tooltip.index] / cpuTotal * 100) + '%)';
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

export default connect(mapStateToProps)(CpuStatsWidget);
