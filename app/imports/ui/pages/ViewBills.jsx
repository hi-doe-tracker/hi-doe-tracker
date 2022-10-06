import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewTab from '../components/BillViewTab';
import Dropdown from 'react-bootstrap/Dropdown';


const officeNames = [
  {
    name: 'ALL BILLS',
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
  },
];

const ViewBills = () => {
  const mobileView = useMediaQuery('(max-width: 850px)');
  return (
    <Container id={PAGE_IDS.VIEW_BILLS} key="viewbills-container">
      <Tab.Container defaultActiveKey="all-bills">
        {mobileView ? <br /> : <div />}
        <Row>
          <Col sm="1" />
          <Col sm="2">
            <h2>Offices</h2>
            <Nav variant="pills" className={mobileView ? 'mb-3' : 'flex-column'}>
              {officeNames.map((office) => (
                <Nav.Item key={office.name}><Nav.Link eventKey={office.eventKey}>{office.name}</Nav.Link></Nav.Item>
              ))}
            </Nav>
            {mobileView ? <br /> : <div />}
          </Col>
          <Col sm="8">
            <DropdownButton id="dropdown-basic-button" title="Sort bills">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <Tab.Content>
              {officeNames.map((officeName) => (
                <BillViewTab
                  key={officeName.name}
                  eventKey={officeName.eventKey}
                  officeName={officeName.name}
                />
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ViewBills;
