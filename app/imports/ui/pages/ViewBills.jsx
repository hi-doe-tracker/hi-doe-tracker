import React from 'react';
import { ListGroup, Row, Col, Tab, Nav } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewDisplay from '../components/BillViewDisplay';
import BillViewTab from '../components/BillViewTab';

const officeNames = [
  {
    name: 'All Bills',
    eventKey: 'all-bills',
  },
  {
    name: 'DEPUTY',
    eventKey: 'deputy-bills',
  },
  {
    name: 'OCID',
    eventKey: 'ocid-bills',
  },
  {
    name: 'OFO',
    eventKey: 'ofo-bills',
  },
  {
    name: 'OFS',
    eventKey: 'ofs-bills',
  },
  {
    name: 'OITS',
    eventKey: 'oits-bills',
  },
  {
    name: 'OSIP',
    eventKey: 'osip-bills',
  },
  {
    name: 'OSSS',
    eventKey: 'osss-bills',
  },
  {
    name: 'OTM',
    eventKey: 'otm-bills',
  }];

const ViewBills = () => {

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
              <Nav.Link eventKey="ocid-bills">OCID</Nav.Link>
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
            {officeNames.map(officeName => <BillViewTab key={officeName.name} eventKey={officeName.eventKey} officeName={officeName.name} />)}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ViewBills;
