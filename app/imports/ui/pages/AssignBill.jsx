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
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
// import { defineMethod } from '../../api/base/BaseCollection.methods';

// A schema for a form.
const formSchema = {
  assignedBill: {
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
  actionNumber: String,
  legalType: String,
  committeeReferral: String,
  allVersions: { type: Array, minCount: 1 },
  'allVersions.$': Object,
  'allVersions.$.version': { type: String, min: 0 },
  committeeReports: { type: Array, minCount: 1 },
  'committeeReports.$': Object,
  'committeeReports.$.report': { type: String, min: 0 },
  hearingNotices: { type: Array, minCount: 1 },
  'hearingNotices.$': Object,
  'hearingNotices.$.report': { type: String, min: 0 },
  notifiedHearing: String,
  hearingDate: { type: Date, defaultValue: new Date() },
  hearingLocation: String,
  committee: String,
  type: String,
  testifierContact: String,
  similar: String,
  leadOfficePosition: String,
  testifier: String,
  approvedTestimony: String,
  monitoringReports: { type: Array, minCount: 1 },
  'monitoringReports.$': Object,
  'monitoringReports.$.report': { type: String, min: 0 },
  hearingComments: { type: Array, minCount: 1 },
  'hearingComments.$': Object,
  'hearingComments.$.report': { type: String, min: 0 },
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
    formSchema.assignedBill.allowedValues = holdBillAllowedValues(scraperBills);
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
      assignedBill,
      deputy,
      ocid,
      ofo,
      ofs,
      oits,
      osip,
      osss,
      otm,
      action,
      actionNumber,
      legalType,
      committeeReferral,
      allVersions,
      committeeReports,
      hearingNotices,
      notifiedHearing,
      hearingDate,
      hearingLocation,
      committee,
      type,
      testifierContact,
      similar,
      leadOfficePosition,
      testifier,
      approvedTestimony,
      monitoringReports,
      hearingComments,
      testimony,
      rationale,
    } = data;

    // Gets offices and billData.
    const offices = getOfficesSelected(deputy, ocid, ofo, ofs, oits, osip, osss, otm);
    const billData = getChosenBillData(assignedBill, scraperBills);

    // Fills new bill data with scraper bill data.
    const billLink = billData.measureArchiveUrl;
    const billNo = billData.measureNumber;
    const status = billData.status;
    const companion = billData.companion;
    const reportTitle = billData.reportTitle;
    const measureTitle = billData.measureTitle;
    const introducedBy = billData.introducer;
    const introducedByDate = billData.year;
    const description = billData.description;
    const lastStatus = billData.lastUpdated;

    /*
      const owner = Meteor.user().username;
      const collectionName = Stuffs.getCollectionName(); */
    const definitionData = {
      assignedBill,
      offices,
      action,
      actionNumber,
      legalType,
      committeeReferral,
      allVersions,
      committeeReports,
      hearingNotices,
      notifiedHearing,
      hearingDate,
      hearingLocation,
      committee,
      type,
      testifierContact,
      similar,
      leadOfficePosition,
      testifier,
      approvedTestimony,
      monitoringReports,
      hearingComments,
      testimony,
      rationale,
      billLink,
      billNo,
      status,
      companion,
      reportTitle,
      measureTitle,
      introducedBy,
      introducedByDate,
      description,
      lastStatus,
    };
      /*
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
                <Row><Col><SelectField name="assignedBill" /></Col></Row>
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
                  <Col><TextField name="actionNumber" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="legalType" /></Col>
                  <Col><TextField name="committeeReferral" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="allVersions"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="committeeReports"
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
                      name="hearingNotices"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <TextField name="notifiedHearing" />
                    <DateField name="hearingDate" />
                    <TextField name="hearingLocation" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="committee" /></Col>
                  <Col><TextField name="type" /></Col>
                  <Col><TextField name="testifierContact" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="similar" /></Col>
                  <Col><TextField name="leadOfficePosition" /></Col>
                  <Col><TextField name="testifier" /></Col>
                  <Col><TextField name="approvedTestimony" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="monitoringReports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="hearingComments"
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
