import React
       from 'react';

import {Route}
       from 'react-router-dom';

import User
       from 'web/containers/content/user/User';
import UserList
       from 'web/containers/content/user/UserList';

const UserRouter = () => {
  return (
    <div>
      <Route path='/user/list' component={UserList} />
      <Route path='/user/:id' component={User} />
    </div>
  );
};


export default UserRouter;
