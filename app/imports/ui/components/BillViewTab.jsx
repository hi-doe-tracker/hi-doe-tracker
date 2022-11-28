import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Tab, Tabs, Table } from 'react-bootstrap';
import BillViewDisplay from './BillViewDisplay';
import { Bills } from '../../api/bill/BillCollection';
import LoadingSpinner from './LoadingSpinner';

/** Returns the UI for a Tab given the office Name. */
const BillViewTab = ({ eventKey, officeName }) => {
  const { ready, bills } = useTracker(() => {
    const subscription = Bills.subscribeBill();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { name: 1 } }).fetch();
    return {
      bills: billItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Tab.Pane eventKey={eventKey}>
      <h2>{officeName}</h2>
      <Table striped bordered responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hearing Date</th>
            <th>Offices</th>
          </tr>
        </thead>
        <tbody>
          {officeName === 'ALL BILLS' ? bills.map((bill) => <BillViewDisplay key={bill._id} billData={bill} />) :
            (bills.filter(bill => bill.office.includes(officeName)).map((bill) => <BillViewDisplay key={bill._id} billData={bill} />))}
        </tbody>
      </Table>
    </Tab.Pane>
  ) : <LoadingSpinner message="Loading Data" />);
};

BillViewTab.propTypes = {
  eventKey: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
};

export default BillViewTab;
