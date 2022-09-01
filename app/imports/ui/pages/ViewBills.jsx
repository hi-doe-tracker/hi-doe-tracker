import React from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
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

const ViewBills = () => (
  <Tab.Container id={PAGE_IDS.VIEW_BILLS} defaultActiveKey="all-bills">
    <Row>
      <Col sm="1" />
      <Col sm="2">
        <h2>Offices</h2>
        <Nav variant="pills" className="flex-column">
          {officeNames.map(office => <Nav.Item><Nav.Link eventKey={office.eventKey}>{office.name}</Nav.Link></Nav.Item>)}
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

export default ViewBills;
