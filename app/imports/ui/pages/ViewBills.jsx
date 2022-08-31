import React from 'react';
import { Container, ListGroup, Row, Col, Tab, Nav } from 'react-bootstrap';
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
      <Row>
        <Col>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">ALL BILLS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">DEPUTY</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">OFSS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="forth">OSF</Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </Col>
        <Col>
          <ListGroup>
            {testData.map((bill) => <BillViewDisplay key={bill.name} billData={bill} />)}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewBills;
