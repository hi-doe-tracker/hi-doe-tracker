import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { CgRemove } from 'react-icons/cg';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import swal from 'sweetalert';
import { AutoForm, BoolField, DateField, ErrorsField, ListField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
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
  deputy: {
    type: Boolean,
    optional: true,
  },
  ocid: {
    type: Boolean,
    optional: true,
  },
  ofo: {
    type: Boolean,
    optional: true,
  },
  ofs: {
    type: Boolean,
    optional: true,
  },
  oits: {
    type: Boolean,
    optional: true,
  },
  osip: {
    type: Boolean,
    optional: true,
  },
  osss: {
    type: Boolean,
    optional: true,
  },
  otm: {
    type: Boolean,
    optional: true,
  },
  action: String,
  actionnumber: String,
  legaltype: String,
  committeereferral: String,
  allversions: { type: Array, minCount: 1 },
  'allversions.$': Object,
  'allversions.$.version': { type: String, min: 0 },
  committeereports: { type: Array, minCount: 1 },
  'committeereports.$': Object,
  'committeereports.$.report': { type: String, min: 0 },
  hearingnotices: { type: Array, minCount: 1 },
  'hearingnotices.$': Object,
  'hearingnotices.$.report': { type: String, min: 0 },
  notifiedhearing: String,
  hearingdate: { type: Date, defaultValue: new Date() },
  hearinglocation: String,
  committee: String,
  type: String,
  testifiercontact: String,
  similar: String,
  leadofficeposition: String,
  testifier: String,
  approvedtestimony: String,
  monitoringreports: { type: Array, minCount: 1 },
  'monitoringreports.$': Object,
  'monitoringreports.$.report': { type: String, min: 0 },
  hearingcomments: { type: Array, minCount: 1 },
  'hearingcomments.$': Object,
  'hearingcomments.$.report': { type: String, min: 0 },
  testimony: {
    type: String,
    allowedValues: ['Testimony 1', 'Testimony 2', 'Testimony 3'],
    defaultValue: 'Testimony 1',
  },
  rationale: String,
};

// Returns an array of the scraper bill names provided as allowed values for the form.
const holdBillAllowedValues = (scraperBills) => {
  const allowedValues = [];
  allowedValues.push('Pick a bill');
  scraperBills.map((bill) => allowedValues.push(`#${bill.measureNumber}: ${bill.measureTitle}`));
  return allowedValues;
};

// Creates a schema based on if the data is ready and the scraper bills given.
const createFormSchema = (ready, scraperBills) => {
  if (ready) {
    // Sets the allowed values for assigned bill to the scraper bill names.
    formSchema['assignedbill'].allowedValues = holdBillAllowedValues(scraperBills);
    return new SimpleSchema(formSchema);
  }
  return new SimpleSchema(formSchema);
};

// Takes in the selected offices' bool values on the form and returns an array of offices the bill fits under.
const getOfficesSelected = (...officeBoolValues) => {
  const selectedOffices = [];
  const offices = ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];

  // Iterates through arguments passed, checks if value is true and adds the corresponding office to the array.
  for (let i = 0; i < officeBoolValues.length; i++) {
    if (officeBoolValues[i]) {
      selectedOffices.push(offices[i]);
    }
  }
  return selectedOffices;
};

// Gets the data for a chosen bill.
const getChosenBillData = (billChosen, scraperBills) => {
  let billNumberString = '';

  for (let i = 1; i < billChosen.length; i++) {
    // Exits loop once bill number is read.
    if (billChosen[i] === ':') {
      break;
    }
    billNumberString = billNumberString.concat(billChosen[i]);
  }

  // Parses the number an then searches for the bill data given the number.
  const billNumber = Number(billNumberString);
  const billData = scraperBills.filter((bill) => bill.measureNumber === billNumber);
  return billData;
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
      ofo,
      ofs,
      oits,
      osip,
      osss,
      otm,
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

    // Holds the offices the bill is categorized under.
    const offices = getOfficesSelected(deputy, ocid, ofo, ofs, oits, osip, osss, otm);
    const billData = getChosenBillData(assignedbill, scraperBills);
    /*
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
     */
  };

  let fRef = null;

  // Makes all office form fields capitalized.
  const officeFormStyle = { textTransform: 'uppercase' };

  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILLS}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Assign Bill</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row><Col><SelectField name="assignedbill" /></Col></Row>
                <Row style={officeFormStyle}>
                  <p>Offices</p>
                  <Col>
                    <BoolField name="deputy" />
                    <BoolField name="ocid" />
                  </Col>
                  <Col>
                    <BoolField name="ofo" />
                    <BoolField name="ofs" />
                  </Col>
                  <Col>
                    <BoolField name="oits" />
                    <BoolField name="osip" />
                  </Col>
                  <Col>
                    <BoolField name="osss" />
                    <BoolField name="otm" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="action" /></Col>
                  <Col><TextField name="actionnumber" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="legaltype" /></Col>
                  <Col><TextField name="committeereferral" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="allversions"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="committeereports"
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
                      name="hearingnotices"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <TextField name="notifiedhearing" />
                    <DateField name="hearingdate" />
                    <TextField name="hearinglocation" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="committee" /></Col>
                  <Col><TextField name="type" /></Col>
                  <Col><TextField name="testifiercontact" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="similar" /></Col>
                  <Col><TextField name="leadofficeposition" /></Col>
                  <Col><TextField name="testifier" /></Col>
                  <Col><TextField name="approvedtestimony" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="monitoringreports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="hearingcomments"
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
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

export default AssignBill;
