import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Person
       from 'web/containers/content/person/Person';
import PersonList
       from 'web/containers/content/person/PersonList';

const PersonRouter = () => {
  return (
    <div>
      <Route path='/person/list' component={PersonList} />
      <Route path='/person/:id' component={Person} />
    </div>
  );
};


export default PersonRouter;
