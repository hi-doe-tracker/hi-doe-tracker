import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { CgRemove } from 'react-icons/cg';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import swal from 'sweetalert';
import { AutoForm, DateField, ListAddField, ListField, RadioField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperbill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
// import { defineMethod } from '../../api/base/BaseCollection.methods';

// Creates a schema based on if the data is ready and the scraper bills given.
const formSchema = new SimpleSchema({
  'assigned bill': {
    type: String,
    allowedValues: ['Bill 1', 'Bill 2', 'Bill 3'],
    defaultValue: 'Bill 1',
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
  'all versions': { type: Array, minCount: 1 },
  'all versions.$': Object,
  'all versions.$.version': { type: String, min: 200 },
  'committee reports': { type: Array, minCount: 1 },
  'committee reports.$': Object,
  'committee reports.$.report': { type: String, min: 200 },
  'hearing notices': { type: Array, minCount: 1 },
  'hearing notices.$': Object,
  'hearing notices.$.report': { type: String, min: 200 },
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
  'monitoring reports.$.report': { type: String, min: 200 },
  'hearing comments': { type: Array, minCount: 1 },
  'hearing comments.$': Object,
  'hearing comments.$.report': { type: String, min: 200 },
  testimony: {
    type: String,
    allowedValues: ['Testimony 1', 'Testimony 2', 'Testimony 3'],
    defaultValue: 'Testimony 1',
  },
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
