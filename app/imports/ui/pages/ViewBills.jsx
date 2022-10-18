import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useMediaQuery } from 'usehooks-ts';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewTab from '../components/BillViewTab';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

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

/** Displays all bills that were assigned to a scraper bill by admin. */
const ViewBills = () => {
  const { ready, userProfile } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const rdy = subscription.ready();
    // Gets the user's information.
    const users = UserProfiles.find({}).fetch();
    const user = users[0];
    return {
      ready: rdy,
      userProfile: user,
    };
  }, []);

  const assignedOffice = ready ? userProfile.assignedOffice : 'ALL BILLS';
  const officeEventKey = officeNames.filter(office => office.name === assignedOffice);
  const mobileView = useMediaQuery('(max-width: 850px)');
  return (ready ? (
    <Container id={PAGE_IDS.VIEW_BILLS} key="viewbills-container">
      <Tab.Container defaultActiveKey={officeEventKey[0].eventKey}>
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
  ) : (<LoadingSpinner />)
  );
};

export default ViewBills;
