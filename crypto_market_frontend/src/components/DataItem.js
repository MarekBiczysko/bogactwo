import React from 'react';

const DataItem = ({currency, value, timestamp}) => (
  <React.Fragment>
    <p>{currency}</p>
    <p>{value}</p>
    <p>{timestamp}</p>
  </React.Fragment>
);

export default DataItem;
