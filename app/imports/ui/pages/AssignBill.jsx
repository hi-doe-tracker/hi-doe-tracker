import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Form, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperbill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const officeNames = ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];

// Creates a schema based on if the data is ready and the scraper bills given.
const createSchema = (ready, scraperBills) => {
  if (ready) {
    // Create a schema to specify the structure of the data to appear in the form.
    return new SimpleSchema({
      assignedBill: {
        type: String,
        allowedValues: scraperBills,
        defaultValue: 'Assign an existing bill',
      },
      offices: {
        type: String,
        allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
        defaultValues: 'Pick an Office',
      },
      action: String,
      actionnumber: String,
      legaltype: String,
      committeereferral: String,
      allversions: String,
      committeereports: String,
      hearingnotices: String,
      notifiedhearingdate: String,
      notifiedhearing: String,
      hearingdate: String,
      hearingtime: String,
      hearinglocation: String,
      committee: String,
      type: String,
      testifiercontact: String,
      similar: String,
      leadofficeposition: String,
      testifier: String,
      approvedtestimony: String,
      monitoringreports: String,
      hearingComments: String,
      testimony: String,
      rationale: String,
    });
  }

  return new SimpleSchema({
    assignedBill: {
      type: String,
      allowedValues: [],
      defaultValue: 'Assign an existing bill',
    },
    offices: {
      type: String,
      allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
      defaultValues: 'Pick an Office',
    },
    action: String,
    actionnumber: String,
    legaltype: String,
    committeereferral: String,
    allversions: String,
    committeereports: String,
    hearingnotices: String,
    notifiedhearingdate: String,
    notifiedhearing: String,
    hearingdate: String,
    hearingtime: String,
    hearinglocation: String,
    committee: String,
    type: String,
    testifiercontact: String,
    similar: String,
    leadofficeposition: String,
    testifier: String,
    approvedtestimony: String,
    monitoringreports: String,
    hearingComments: String,
    testimony: String,
    rationale: String,
  });
};

const AssignBill = () => {
  const { ready, scraperBills } = useTracker(() => {
    const subscription = ScraperBills.subscribeScraperBillAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const scraperBillItems = ScraperBills.find({}, { sort: { name: 1 } }).fetch();
    return {
      scraperBills: scraperBillItems,
      ready: rdy,
    };
  }, []);

  const bridge = new SimpleSchema2Bridge(createSchema(ready, scraperBills));

  // On submit, insert the data.
  const submit = (data, formRef) => {
    if (ready) {
      const {
        assignedBill,
        offices,
        action,
        actionnumber,
        legaltype,
        committeereferral,
        allversions,
        committeereports,
        hearingnotices,
        notifiedhearingdate,
        notifiedhearing,
        hearingdate,
        hearingtime,
        hearinglocation,
        committee,
        type,
        testifiercontact,
        similar,
        leadofficeposition,
        testifier,
        approvedtestimony,
        monitoringreports,
        hearingComments,
        testimony,
        rationale,
      } = data;
      const owner = Meteor.user().username;
      const collectionName = Stuffs.getCollectionName();
      const definitionData = {
        assignedBill,
        offices,
        action,
        actionnumber,
        legaltype,
        committeereferral,
        allversions,
        committeereports,
        hearingnotices,
        notifiedhearingdate,
        notifiedhearing,
        hearingdate,
        hearingtime,
        hearinglocation,
        committee,
        type,
        testifiercontact,
        similar,
        leadofficeposition,
        testifier,
        approvedtestimony,
        monitoringreports,
        hearingComments,
        testimony,
        rationale,
        owner,
      };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Bill added successfully', 'success');
          formRef.reset();
        });
    }
  };

  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILLS}>
      <Form>
        <h3>Assigned Bill</h3>
        <Form.Select>
          <option>Assign an existing bill</option>
          {scraperBills.map(scraperBill => <option key={scraperBill._id} value={scraperBill._id}>{scraperBill.measureTitle}</option>)}
        </Form.Select>
        <h3>Offices</h3>
        {officeNames.map(office => (
          <Form.Check
            inline
            label={office}
            name={office}
            type="checkbox"
            id="inline-checkbox-1"
          />
        ))}
        <Form.Text name="Action" placeholder="Action" />
        <Form.Text name="Action Number" placeholder="Action Number" />
        <Form.Text name="All Versions" placeholder="All Versions" />
        <Form.Text name="Committee Reports" placeholder="Committee Reports" />
        <Form.Text name="Hearing Notices" placeholder="Hearing Notices" />
        <Form.Text name="Notified Hearing Date" placeholder="Notified Hearing Date" />
        <Form.Text name="Notified Hearing" placeholder="Notified Hearing" />
        <Form.Text name="Hearing Date" placeholder="Hearing Date" />
        <Form.Text name="Hearing Time" placeholder="Hearing Time" />
        <Form.Text name="Hearing Location" placeholder="Hearing Location" />
        <Form.Text name="Committee" placeholder="Committee" />
        <Form.Text name="Type" placeholder="Type" />
        <Form.Text name="Testifier Contact" placeholder="Testifier Contact" />
        <Form.Text name="Similar" placeholder="Similar" />
        <Form.Text name="Lead Office Position" placeholder="Lead Office Position" />
        <Form.Text name="Testifier" placeholder="Testifier" />
        <Form.Text name="Approved Testimony" placeholder="Approved Testimony" />
        <Form.Text name="Monitoring Reports" placeholder="Monitoring Reports" />
        <Form.Text name="Hearing Comments" placeholder="Hearing Comments" />
        <Form.Text name="Testimony" placeholder="Testimony" />
        <Form.Text name="Rationale" placeholder="Rationale" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

export default AssignBill;
