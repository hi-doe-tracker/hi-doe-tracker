import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewDisplay from '../components/BillViewDisplay';

const ViewBills = () => {

  const testData = [
    {
      billName: 'Bill 1',
      offices: ['OFC', 'OFFF'],
    },
    {
      billName: 'Bill 2',
      offices: ['DEPUTY', 'OFFF'],
    },
    {
      billName: 'Bill 3',
      offices: ['OSF'],
    },
  ];

  return (
    <Container id={PAGE_IDS.VIEW_BILLS}>
      <ListGroup>
        {testData.map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
      </ListGroup>
    </Container>
  );
};

export default ViewBills;
