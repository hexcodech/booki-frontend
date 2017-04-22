import React
       from 'react';

import {Route}
       from 'react-router-dom';

import ThumbnailType
       from 'web/containers/content/thumbnail-type/ThumbnailType';
import ThumbnailTypeList
       from 'web/containers/content/thumbnail-type/ThumbnailTypeList';

const ThumbnailTypeRouter = () => {
  return (
    <div>
      <Route path='/thumbnail-type/list' component={ThumbnailTypeList} />
      <Route path='/thumbnail-type/:id' component={ThumbnailType} />
    </div>
  );
};


export default ThumbnailTypeRouter;
