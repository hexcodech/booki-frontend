import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Condition
       from 'web/containers/content/condition/Condition';
import ConditionList
       from 'web/containers/content/condition/ConditionList';

const ConditionRouter = () => {
  return (
    <div>
      <Route path='/condition/list' component={ConditionList} />
      <Route path='/condition/:id' component={Condition} />
    </div>
  );
};


export default ConditionRouter;
