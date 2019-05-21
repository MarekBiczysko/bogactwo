import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import DataItem from './DataItem';


const DataList = ({data, handleItemClick}) => {
  let data_list = data.map((item) => {
    return (
      <ListGroupItem key={item.id} href={'#'} onClick={(id) => handleItemClick(item.id)} >
        <DataItem {...item} />
      </ListGroupItem>
    )
  });

  return (
    <ListGroup>
      {data_list}
    </ListGroup>
  )
};

export default DataList;