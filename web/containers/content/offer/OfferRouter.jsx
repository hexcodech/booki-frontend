import React
       from 'react';

import {Route}
       from 'react-router-dom';

import Offer
       from 'web/containers/content/offer/Offer';
import OfferList
       from 'web/containers/content/offer/OfferList';

const OfferRouter = () => {
  return (
    <div>
      <Route path='/offer/list' component={OfferList} />
      <Route path='/offer/:id' component={Offer} />
    </div>
  );
};


export default OfferRouter;
