import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperbill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const offices = ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];

const AssignBill = () => {
  const { ready, scraperBills } = useTracker(() => {
    const subscription = ScraperBills.subscribeScraperBillAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const scraperBillItems = ScraperBills.find({}, { sort: { name: 1 } }).fetch();
    return {
      scraperBills: scraperBillItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILLS}>
      <Form>
        <h3>Assigned Bill</h3>
        <Form.Select>
          <option>Assign an existing bill</option>
          {scraperBills.map(scraperBill => <option key={scraperBill._id} value={scraperBill._id}>{scraperBill.measureTitle}</option>)}
        </Form.Select>
        <h3>Offices</h3>
        {offices.map(office => (
          <Form.Check
            inline
            label={office}
            name={office}
            type="checkbox"
            id="inline-checkbox-1"
          />
        ))}
      </Form>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

export default AssignBill;
