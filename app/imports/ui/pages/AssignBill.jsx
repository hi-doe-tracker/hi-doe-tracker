import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Col, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import swal from 'sweetalert';
import { AutoForm, ListAddField, RadioField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperbill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
// import { defineMethod } from '../../api/base/BaseCollection.methods';

// Creates a schema based on if the data is ready and the scraper bills given.
const formSchema = new SimpleSchema({
  'assigned bill': {
    type: String,
    allowedValues: ['1', '2', '3'],
    defaultValue: '1',
  },
  offices: {
    type: String,
    allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
    defaultValue: 'DEPUTY',
  },
  action: String,
  'action number': String,
  'legal type': String,
  'committee referral': String,
  'all versions': String,
  'committee reports': String,
  'hearing notices': String,
  'notified hearing date': String,
  'notified hearing': String,
  'hearing date': String,
  'hearing time': String,
  'hearing location': String,
  committee: String,
  type: String,
  'testifier contact': String,
  similar: String,
  'lead office position': String,
  testifier: String,
  'approved testimony': String,
  'monitoring reports': String,
  'hearing comments': String,
  testimony: String,
  rationale: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

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

  // On submit, insert the data.
  const submit = (data, formRef) => {
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
                {/*
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
                 ))} */}
                <Row>
                  <Col><SelectField name="assigned bill" /></Col>
                  <Col><SelectField name="offices" checkboxes="true" inline="true" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="action" /></Col>
                  <Col><TextField name="action number" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="all versions" /></Col>
                  <Col><TextField name="committee reports" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="hearing notices" /></Col>
                  <Col><TextField name="notified hearing date" /></Col>
                  <Col><TextField name="notified hearing" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="hearing date" /></Col>
                  <Col><TextField name="hearing time" /></Col>
                  <Col><TextField name="hearing location" /></Col>
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
                  <Col><TextField name="monitoring reports" /></Col>
                  <Col><TextField name="hearing comments" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="testimony" /></Col>
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
