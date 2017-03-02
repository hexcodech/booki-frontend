import React				from 'react';
import {connect}			from 'react-redux';

import GeneralStats			from 'web/containers/content/dashboard/widgets/GeneralStats';
import MemoryStats			from 'web/containers/content/dashboard/widgets/MemoryStats';
import CpuStats				from 'web/containers/content/dashboard/widgets/CpuStats';
import UserStats			from 'web/containers/content/dashboard/widgets/UserStats';

const DashboardContent = ({children}) => {
	
	return (	
		<div className='dashboard-content'>
			<GeneralStats />
			<MemoryStats />
			<CpuStats />
			<UserStats />
		</div>
	);
};

export default connect()(DashboardContent);