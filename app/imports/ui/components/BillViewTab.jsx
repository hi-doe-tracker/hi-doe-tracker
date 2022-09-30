import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { ListGroup, Tab, Tabs } from 'react-bootstrap';
import BillViewDisplay from './BillViewDisplay';
import { Bills } from '../../api/bill/BillCollection';
import LoadingSpinner from './LoadingSpinner';

/* const testData = [
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
]; */

const BillViewTab = ({ eventKey, officeName }) => {
  const { ready, bills } = useTracker(() => {
    const subscription = Bills.subscribeBillAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { name: 1 } }).fetch();
    return {
      bills: billItems,
      ready: rdy,
    };
  }, []);

  if (officeName === 'ALL BILLS') {
    return (ready ? (
      <Tab.Pane eventKey={eventKey}>
        <h2>{officeName}</h2>
        <Tabs defaultActiveKey="active-bills">
          <Tab eventKey="active-bills" title="ACTIVE BILLS">
            <ListGroup>
              {/* testData.filter((bill) => !bill.isDisabled).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />) */}
              {bills.map((bill) => <BillViewDisplay key={bill._id} billData={bill} />)}
            </ListGroup>
          </Tab>
          <Tab eventKey="in-active-bills" title="INACTIVE BILLS">
            <ListGroup>
              {/* testData.filter((bill) => bill.isDisabled).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />) */}
              {bills.map((bill) => <BillViewDisplay key={bill._id} billData={bill} />)}
            </ListGroup>
          </Tab>
        </Tabs>
      </Tab.Pane>
    ) : <LoadingSpinner message="Loading Data" />);
  }
  return (ready ? (
    <Tab.Pane eventKey={eventKey}>
      <h2>{officeName}</h2>
      <Tabs defaultActiveKey="active-bills">
        <Tab eventKey="active-bills" title="ACTIVE BILLS">
          <ListGroup>
            {/* testData.filter((bill) => !bill.isDisabled && bill.offices.includes(officeName)).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />) */}
            {bills.map((bill) => <BillViewDisplay key={bill._id} billData={bill} />)}
          </ListGroup>
        </Tab>
        <Tab eventKey="in-active-bills" title="INACTIVE BILLS">
          <ListGroup>
            {/* testData.filter((bill) => bill.isDisabled && bill.offices.includes(officeName)).map((bill) => <BillViewDisplay key={bill.name} billData={bill} />) */}
            {bills.map((bill) => <BillViewDisplay key={bill._id} billData={bill} />)}
          </ListGroup>
        </Tab>
      </Tabs>
    </Tab.Pane>
  ) : <LoadingSpinner message="Loading Data" />);
};

BillViewTab.propTypes = {
  eventKey: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
};

export default BillViewTab;
