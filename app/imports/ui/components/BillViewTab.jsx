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

  /* Checks status of the bill. */
  const checkIfActive = (bill) => {
    const searchWord = '(Gov.';
    // Checks if the bill was passed.
    for (let i = 0; i < bill.status.length; i++) {
      if (bill.status.substring(i, searchWord.length + i) === searchWord) {
        return true;
      }
    }
    const searchDateArray = [];
    let i = 0;
    // Finds the date of the next deadline for the bill.
    while (bill.status[i] !== '-') {
      if (bill.status[i] !== '(' && bill.status[i] !== 'S' && bill.status[i] !== ')' && bill.status[i] !== 'H') {
        searchDateArray.push(bill.status[i]);
      }
      i++;
    }
    const searchDate = new Date(searchDateArray.join(''));
    const todayDate = new Date();

    // Checks year, month and day if the bill has already passed its deadline and the status didn't change.
    if (searchDate.getFullYear() < todayDate.getFullYear()) {
      return false;
    }
    if (searchDate.getMonth() < todayDate.getMonth()) {
      return false;
    }
    if (searchDate.getDay() < todayDate.getDay()) {
      return false;
    }
    return true;
  };

  return (ready ? (
    <Tab.Pane eventKey={eventKey}>
      <h2>{officeName}</h2>
      <Tabs defaultActiveKey="active-bills">
        <Tab eventKey="active-bills" title="ACTIVE BILLS">
          <Table striped bordered responsive="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hearing Date</th>
                <th>Offices</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {officeName === 'ALL BILLS' ? bills.filter(bill => checkIfActive(bill)).map((bill) => <BillViewDisplay key={bill._id} billData={bill} />) :
                (bills.filter(bill => bill.office.includes(officeName) && checkIfActive(bill)).map((bill) => <BillViewDisplay key={bill._id} billData={bill} />))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="in-active-bills" title="INACTIVE BILLS">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hearing Date</th>
                <th>Offices</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {officeName === 'ALL BILLS' ? (bills.filter(bill => !checkIfActive(bill)).map((bill) => <BillViewDisplay key={bill._id} billData={bill} />)) :
                (bills.filter(bill => bill.office.includes(officeName) && !checkIfActive(bill)).map((bill) => <BillViewDisplay key={bill._id} billData={bill} />))}
            </tbody>
          </Table>
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
