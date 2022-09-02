import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Nav, Tab } from 'react-bootstrap';
import BillViewDisplay from './BillViewDisplay';
import { PAGE_IDS } from '../utilities/PageIDs';

const testData = [
  {
    billName: 'Bill 1',
    offices: ['OSSS', 'OTM'],
    date: '03/22/2019',
    url: 'Bill 1 Link',
    progress: 50,
    isDisabled: false,
  },
  {
    billName: 'Bill 2',
    offices: ['DEPUTY', 'OITS'],
    date: '02/25/2022',
    url: 'Bill 2 Link',
    progress: 20,
    isDisabled: false,
  },
  {
    billName: 'Bill 3',
    offices: ['OFO'],
    date: '11/19/2021',
    url: 'Bill 3 Link',
    progress: 80,
    isDisabled: true,
  },
];

const BillViewTab = ({ eventKey, officeName }) => {
  if (officeName === 'ALL BILLS') {
    return (
      <Tab.Pane eventKey={eventKey}>
        <h2>{officeName}</h2>
        <Nav variant="tabs" >
          <Nav.Item><Nav.Link eventKey="active-bills">ACTIVE BILLS</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="inactive-bills">INACTIVE BILLS</Nav.Link></Nav.Item>
        </Nav>
        <ListGroup>
          {testData.map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
        </ListGroup>
      </Tab.Pane>
    );
  }
  return (
    <Tab.Pane eventKey={eventKey}>
      <h2>{officeName}</h2>
      <Nav variant="pills">
        <Nav.Item><Nav.Link>ACTIVE BILLS</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link>INACTIVE BILLS</Nav.Link></Nav.Item>
      </Nav>
      <ListGroup>
        {testData.filter((bill) => bill.offices.includes(officeName)).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
      </ListGroup>
    </Tab.Pane>
  );
};

BillViewTab.propTypes = {
  eventKey: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
};

export default BillViewTab;
