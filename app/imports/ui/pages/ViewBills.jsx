import React from 'react';
import { ListGroup, Row, Col, Tab, Nav } from 'react-bootstrap';
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
    <Tab.Container id={PAGE_IDS.VIEW_BILLS} defaultActiveKey="all-bills">
      <Row>
        <Col sm="3">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="all-bills">ALL BILLS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="deputy-bills">DEPUTY</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ofss-bills">OFSS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="osf-bills">OSF</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ofc-bills">OFC</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm="8">
          <Tab.Content>
            <Tab.Pane eventKey="all-bills">
              <ListGroup>
                {testData.map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="deputy-bills">
              <ListGroup>
                {testData.filter(bill => bill.offices.includes('DEPUTY')).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="ofss-bills">
              <ListGroup>
                {testData.filter(bill => bill.offices.includes('OFFF')).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="osf-bills">
              <ListGroup>
                {testData.filter(bill => bill.offices.includes('OSF')).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
              </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="ofc-bills">
              <ListGroup>
                {testData.filter(bill => bill.offices.includes('OFC')).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ViewBills;
