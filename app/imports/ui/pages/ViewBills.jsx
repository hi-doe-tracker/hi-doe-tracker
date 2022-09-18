import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewTab from '../components/BillViewTab';

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
  const mobileView = useMediaQuery('(max-width: 760px)');

  if (mobileView) {
    return (
      <Container id={PAGE_IDS.VIEW_BILLS}>
        <Tab.Container defaultActiveKey="all-bills">
          <br />
          <Row>
            <Col sm="1" />
            <Col sm="2">
              <h2>Offices</h2>
              <Nav variant="pills" className="mb-3">
                {officeNames.map((office) => (
                  <Nav.Item>
                    <Nav.Link eventKey={office.eventKey}>
                      {office.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <br />
            </Col>
            <Col sm="8">
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
  }

  return (
    <Container id={PAGE_IDS.VIEW_BILLS}>
      <Tab.Container defaultActiveKey="all-bills">
        <Row>
          <Col sm="1" />
          <Col sm="2">
            <h2>Offices</h2>
            <Nav variant="pills" className="flex-column">
              {officeNames.map((office) => (
                <Nav.Item>
                  <Nav.Link eventKey={office.eventKey}>{office.name}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm="8">
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
