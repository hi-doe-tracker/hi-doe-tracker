import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { useMediaQuery } from 'usehooks-ts';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { Row, Col, Tab, Nav, Container, Table } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillViewTab from '../components/BillViewTab';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import ScraperBillViewDisplay from '../components/ScraperBillViewDisplay';
import { ROLE } from '../../api/role/Role';

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
  const { ready, userProfile, scraperBills } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserProfiles();
    const subscription2 = ScraperBills.subscribeScraperBillAdmin();
    const rdy = subscription.ready() && subscription2.ready();
    // Gets the user's information.
    const users = UserProfiles.find({}).fetch();
    const user = users[0];
    const bills = ScraperBills.find({}).fetch();
    return {
      ready: rdy,
      userProfile: user,
      scraperBills: bills,
    };
  }, []);

  const [eventKey, setEventKey] = useState('');
  const [name, setName] = useState('');
  const [sort, setSort] = useState('oldest');

  useEffect(() => {
    const assignedOffice = ready ? userProfile.assignedOffice : 'ALL BILLS';
    const officeEventKey = officeNames.filter(office => office.name === assignedOffice)[0].eventKey;
    setEventKey(officeEventKey);
    setName(assignedOffice);
  }, []);
  const mobileView = useMediaQuery('(max-width: 850px)');
  const hStyle = { marginLeft: '20px' };

  const sortedBillList = () => {
    const table =
      (
        <BillViewTab
          key={sort}
          eventKey={eventKey}
          officeName={name}
          sortedBills={sort}
        />
      );
    return table;
  };

  return (ready ? (
    <Container id={PAGE_IDS.VIEW_BILLS} key="viewbills-container">
      <Tab.Container defaultActiveKey={eventKey}>
        {mobileView ? <br /> : <div />}
        <Row>
          <Col sm="1" />
          <Col sm="2">
            <h2 style={hStyle}>Offices</h2>
            <Nav variant="pills" className={mobileView ? 'mb-3' : 'flex-column'}>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (<Nav.Item><Nav.Link eventKey="unassigned-bills">UNASSIGNED BILLS</Nav.Link></Nav.Item>) : <div />}
              {officeNames.map((office) => (
                <Nav.Item id="officeitem" key={office.name} onClick={() => { setEventKey(office.eventKey); setName(office.name); }}><Nav.Link eventKey={office.eventKey}>{office.name}</Nav.Link></Nav.Item>
              ))}
            </Nav>
            {mobileView ? <br /> : <div />}
          </Col>
          <Col sm="8">
            <DropdownButton id="dropdown-basic-button" title="Sort bills" style={{ float: 'right' }}>
              <Dropdown.Item eventKey={eventKey} onClick={() => { setSort('oldest'); }}>
                Hearing date (oldest)
              </Dropdown.Item>
              <Dropdown.Item eventKey={eventKey} onClick={() => { setSort('newest'); }}> Hearing date (newest)</Dropdown.Item>
            </DropdownButton>
            <Tab.Content>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                <Tab.Pane eventKey="unassigned-bills">
                  <h2>Unassigned Bills</h2>
                  <Table striped bordered responsive="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scraperBills.map(scraperBill => <ScraperBillViewDisplay key={scraperBill._id} scraperBillData={scraperBill} />)}
                    </tbody>
                  </Table>
                </Tab.Pane>
              ) : <div />}
              { sortedBillList() }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  ) : (<LoadingSpinner />)
  );
};

export default ViewBills;
