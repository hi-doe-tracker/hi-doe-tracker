import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { CgRemove } from 'react-icons/cg';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import swal from 'sweetalert';
import { AutoForm, BoolField, DateField, ListField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperbill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
// import { defineMethod } from '../../api/base/BaseCollection.methods';

// A schema for a form.
const formSchema = {
  assignedbill: {
    type: String,
    allowedValues: ['Pick a bill'],
    defaultValue: 'Pick a bill',
  },
  deputy: Boolean,
  ocid: Boolean,
  offices: {
    type: String,
    allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
    defaultValue: 'DEPUTY',
  },
  action: String,
  'action number': String,
  'legal type': String,
  'committee referral': String,
  'all versions': { type: Array, minCount: 1 },
  'all versions.$': Object,
  'all versions.$.version': { type: String, min: 0 },
  'committee reports': { type: Array, minCount: 1 },
  'committee reports.$': Object,
  'committee reports.$.report': { type: String, min: 0 },
  'hearing notices': { type: Array, minCount: 1 },
  'hearing notices.$': Object,
  'hearing notices.$.report': { type: String, min: 0 },
  'notified hearing': String,
  'hearing date': { type: Date, defaultValue: new Date() },
  'hearing location': String,
  committee: String,
  type: String,
  'testifier contact': String,
  similar: String,
  'lead office position': String,
  testifier: String,
  'approved testimony': String,
  'monitoring reports': { type: Array, minCount: 1 },
  'monitoring reports.$': Object,
  'monitoring reports.$.report': { type: String, min: 0 },
  'hearing comments': { type: Array, minCount: 1 },
  'hearing comments.$': Object,
  'hearing comments.$.report': { type: String, min: 0 },
  testimony: {
    type: String,
    allowedValues: ['Testimony 1', 'Testimony 2', 'Testimony 3'],
    defaultValue: 'Testimony 1',
  },
  rationale: String,
};

// Returns an array of the scraper bill names provided as well as 'Pick a bill' as allowed values for the form.
const holdBillAllowedValues = (scraperBills) => {
  const allowedValues = [];
  allowedValues.push('Pick a bill');
  scraperBills.map((bill) => allowedValues.push(`Title: ${bill.measureTitle}, Number: ${bill.measureNumber}`));
  return allowedValues;
};

// Creates a schema based on if the data is ready and the scraper bills given.
const createFormSchema = (ready, scraperBills) => {
  if (ready) {
    // Sets the allowed values for assigned bill to the scraper bill names.
    formSchema['assignedbill'].allowedValues = holdBillAllowedValues(scraperBills);
    console.log(holdBillAllowedValues(scraperBills));
    return new SimpleSchema(formSchema);
  }
  return new SimpleSchema(formSchema);
};

const getOfficesSelected = (deputy, ocid) => {
  console.log(deputy);
  console.log(ocid);
};

/* Assigns an existing scraper bill to a bill with more data provided through a form which the user fills out. */
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

  // Creates the bridge based on the data given.
  const bridge = new SimpleSchema2Bridge(createFormSchema(ready, scraperBills));

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const {
      assignedbill,
      deputy,
      ocid,
      offices,
      action,
      actionnumber,
      legaltype,
      committeereferral,
      allversions,
      committeereports,
      hearingnotices,
      notifiedhearing,
      hearingdate,
      hearinglocation,
      committee,
      type,
      testifiercontact,
      similar,
      leadofficeposition,
      testifier,
      approvedtestimony,
      monitoringreports,
      hearingcomments,
      testimony,
      rationale,
    } = data;
    console.log(`Assigned Bill: ${assignedbill}`);
    getOfficesSelected(deputy, ocid);
    /*
    if (ready) {
      const {
        assignedbill,
        offices,
        action,
        actionnumber,
        legaltype,
        committeereferral,
        allversions,
        committeereports,
        hearingnotices,
        notifiedhearing,
        hearingdate,
        hearinglocation,
        committee,
        type,
        testifiercontact,
        similar,
        leadofficeposition,
        testifier,
        approvedtestimony,
        monitoringreports,
        hearingcomments,
        testimony,
        rationale,
      } = data;
      const owner = Meteor.user().username;
      const collectionName = Stuffs.getCollectionName();
      const definitionData = {
        assignedbill,
        offices,
        action,
        actionnumber,
        legaltype,
        committeereferral,
        allversions,
        committeereports,
        hearingnotices,
        notifiedhearing,
        hearingdate,
        hearinglocation,
        committee,
        type,
        testifiercontact,
        similar,
        leadofficeposition,
        testifier,
        approvedtestimony,
        monitoringreports,
        hearingcomments,
        testimony,
        rationale,
      };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Bill added successfully', 'success');
          formRef.reset();
        });
    } */
  };

  let fRef = null;

  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILLS}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Assign Bill</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><SelectField name="assignedbill" /></Col>
                  <Col>
                    <BoolField name="deputy" />
                    <BoolField name="ocid" />
                  </Col>
                  <Col><SelectField name="offices" checkboxes="true" inline="true" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="action" /></Col>
                  <Col><TextField name="action number" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="all versions"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="committee reports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="hearing notices"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <TextField name="notified hearing" />
                    <DateField name="hearing date" />
                    <TextField name="hearing location" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="committee" /></Col>
                  <Col><TextField name="type" /></Col>
                  <Col><TextField name="testifier contact" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="similar" /></Col>
                  <Col><TextField name="lead office position" /></Col>
                  <Col><TextField name="testifier" /></Col>
                  <Col><TextField name="approved testimony" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="monitoring reports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="hearing comments"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                </Row>
                <Row>
                  <Col><SelectField name="testimony" /></Col>
                  <Col><TextField name="rationale" /></Col>
                </Row>
                <SubmitField value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

export default AssignBill;
