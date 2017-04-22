import React
       from 'react';

import Spinner
       from 'web/components/Spinner';

import Widget
       from 'web/containers/content/dashboard/widgets/Widget';

const SpinnerWidget = () => {
  return (
    <Widget>
      <Spinner/>
    </Widget>
  );
};

export default SpinnerWidget;
