import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Image
       from 'web/containers/content/image/Image';
import ImageList
       from 'web/containers/content/image/ImageList';

const ImageRouter = () => {
  return (
    <div>
      <Route path='/image/list' component={ImageList} />
      <Route path='/image/:id' component={Image} />
    </div>
  );
};


export default ImageRouter;
