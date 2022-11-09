import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { CgRemove } from 'react-icons/cg';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, BoolField, DateField, ErrorsField, ListField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ScraperBills } from '../../api/scraperBill/ScraperBillCollection';
import { Bills } from '../../api/bill/BillCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// A schema for a form.
const formSchema = {
  assignedBill: {
    type: String,
    allowedValues: ['Pick a bill'],
    defaultValue: 'Pick a bill',
  },
  mainOffice: {
    type: String,
    allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
    defaultValue: 'DEPUTY',
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
  committeeReferral: { type: Array, minCount: 1 },
  'committeeReferral.$': String,
  allVersions: { type: Array, minCount: 1 },
  'allVersions.$': String,
  committeeReports: { type: Array, minCount: 1 },
  'committeeReports.$': String,
  notifiedHearing: String,
  hearingDate: { type: Date, defaultValue: new Date() },
  hearingLocation: String,
  committee: String,
  type: String,
  testifierContact: { type: Array, minCount: 1 },
  'testifierContact.$': String,
  similar: { type: Array, minCount: 1 },
  'similar.$': String,
  leadOfficePosition: String,
  testifier: String,
  approvedTestimony: { type: Array, minCount: 1 },
  'approvedTestimony.$': String,
  monitoringReports: { type: Array, minCount: 1 },
  'monitoringReports.$': String,
  hearingComments: { type: Array, minCount: 1 },
  'hearingComments.$': String,
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
  const { _id } = useParams();
  const [mainOfficeValue, setMainOfficeValue] = useState('DEPUTY');
  const { ready, scraperBills } = useTracker(() => {
    const subscription = ScraperBills.subscribeScraperBillAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const scraperBillItems = ScraperBills.find({}, { sort: { name: 1 } }).fetch();
    if (_id !== 'all') {
      const scraperBillDefault = ScraperBills.find({ _id: _id }, { sort: { name: 1 } }).fetch();
      // Assigns a new default value to the assignedBill field if a measure number and name were given.
      formSchema.assignedBill.defaultValue = `#${scraperBillDefault[0].measureNumber}: ${scraperBillDefault[0].measureTitle}`;
    } else {
      formSchema.assignedBill.defaultValue = 'Pick a bill';
    }
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
      mainOffice,
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
      rationale,
    } = data;

    // Gets the bill data from the bill title chosen.
    const filteredBillData = getChosenBillData(assignedBill, scraperBills);
    const billData = filteredBillData[0];
    // Gets the offices from the office bool values selected.
    const office = getOfficesSelected(deputy, ocid, ofo, ofs, oits, osip, osss, otm);

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
    const lastStatus = [];

    const collectionName = Bills.getCollectionName();

    const definitionData = {
      billLink,
      billNo,
      mainOffice,
      office,
      action,
      status,
      actionNumber,
      companion,
      reportTitle,
      legalType,
      committeeReferral,
      measureTitle,
      introducedBy,
      introducedByDate,
      description,
      allVersions,
      committeeReports,
      lastStatus,
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
      rationale,
    };

    // Inserts the newly created bill into the database.
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Bill added successfully', 'success');
        formRef.reset();
      });
  };

  let fRef = null;

  // Makes all office form fields capitalized.
  const officeFormStyle = { textTransform: 'uppercase' };
  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILL}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Assign Bill</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row><Col><SelectField id="assignedBill" name="assignedBill" /></Col></Row>
                <Row><Col><SelectField id="mainOffice" name="mainOffice" onChange={value => setMainOfficeValue(value)} /></Col></Row>
                <p>Sub Offices</p>
                <Row style={officeFormStyle}>
                  <Col>
                    {mainOfficeValue !== 'DEPUTY' ? <BoolField id="deputy-checkbox" name="deputy" /> : <div />}
                    {mainOfficeValue !== 'OCID' ? <BoolField id="ocid-checkbox-checkbox" name="ocid" /> : <div />}
                  </Col>
                  <Col>
                    {mainOfficeValue !== 'OFO' ? <BoolField id="ofo-checkbox" name="ofo" /> : <div />}
                    {mainOfficeValue !== 'OFS' ? <BoolField id="ofs-checkbox" name="ofs" /> : <div />}
                  </Col>
                  <Col>
                    {mainOfficeValue !== 'OITS' ? <BoolField id="oits-checkbox" name="oits" /> : <div />}
                    {mainOfficeValue !== 'OSIP' ? <BoolField id="osip-checkbox" name="osip" /> : <div />}
                  </Col>
                  <Col>
                    {mainOfficeValue !== 'OSSS' ? <BoolField id="osss-checkbox" name="osss" /> : <div />}
                    {mainOfficeValue !== 'OTM' ? <BoolField id="otm-checkbox" name="otm" /> : <div />}
                  </Col>
                </Row>
                <Row>
                  <Col><TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_ACTION} name="action" /></Col>
                  <Col><TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_ACTION_NUMBER} name="actionNumber" /></Col>
                  <Col><TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_LEGAL_TYPE} name="legalType" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE_REFERRAL}
                      name="committeeReferral"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE_REPORTS}
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
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_ALL_VERSIONS}
                      name="allVersions"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                    <ListField
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_TESTIFIER_CONTACT}
                      name="testifierContact"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                    <Col>
                      <ListField
                        id={COMPONENT_IDS.ASSIGN_BILL_FORM_SIMILAR}
                        name="similar"
                        addIcon={<GrFormAdd />}
                        initialCount="1"
                        removeIcon={<CgRemove />}
                        showInlineError
                      />
                    </Col>
                  </Col>
                  <Col>
                    <DateField name="hearingDate" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_NOTIFIED_HEARING} name="notifiedHearing" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_HEARING_LOCATION} name="hearingLocation" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE} name="committee" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_TYPE} name="type" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_LEAD_OFFICE_POSITION} name="leadOfficePosition" />
                    <TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_TESTIFIER} name="testifier" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_APPROVED_TESTIMONY}
                      name="approvedTestimony"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_HEARING_COMMENTS}
                      name="hearingComments"
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
                      id={COMPONENT_IDS.ASSIGN_BILL_FORM_MONITORING_REPORTS}
                      name="monitoringReports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col><TextField id={COMPONENT_IDS.ASSIGN_BILL_FORM_RATIONALE} name="rationale" /></Col>
                </Row>
                <SubmitField id={COMPONENT_IDS.ASSIGN_BILL_FORM_SUBMIT} value="Submit" />
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
