import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Client
       from 'web/containers/content/client/Client';
import ClientList
       from 'web/containers/content/client/ClientList';

const ClientRouter = () => {
  return (
    <div>
      <Route path='/client/list' component={ClientList} />
      <Route path='/client/:id' component={Client} />
    </div>
  );
};


export default ClientRouter;
