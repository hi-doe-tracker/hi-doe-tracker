import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Form, Spinner } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  SelectField,
  SubmitField,
  TextField,
  LongTextField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Bills } from '../../api/bill/BillCollection';
import { TestimonyFileCollection } from '../../api/testimony/TestimonyFileCollection';
import { Notifications } from '../../api/notification/NotificationCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  // billNo: is added but not included in the schema
  firstName: String,
  lastName: String,
  position: {
    type: String,
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
  testifyingAs: {
    type: String,
    allowedValues: ['Individual', 'Organization'],
  },
  organization: {
    type: String,
    optional: true,
  },
  testifyingMethod: {
    type: String,
    allowedValues: [
      'Remotely via Zoom during the hearing & submitting written testimony',
      'Written testimony only',
    ],
  },
  testimony: {
    type: String,
    optional: true,
  },
  hasPdf: {
    type: Boolean,
    defaultValue: false,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Submit Testimony page for adding a document. */
const SubmitTestimony = () => {
  const [billNo, setBillNo] = useState('');
  const [uploadFile, setUploadFile] = useState({});
  const [hidden, setHidden] = useState(true);
  const [hasFile, setHasFile] = useState(false);

  const { bills, billName, ready } = useTracker(() => {
    const subscription = Bills.subscribeBill();
    // Determine if the subscription is ready
    const rdy = subscription.ready();

    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { name: 1 } }).fetch();
    const billname = billItems.map((bill) => bill.billNo);
    return {
      bills: billItems,
      billName: billname,
      ready: rdy,
    };
  }, []);

  // On submit, create new notification.
  const submitNotification = (billNumber, person) => {
    const collectionName = Notifications.getCollectionName();
    const definitionData = { message: `Testimony for bill: #${billNumber} was created.`,
      messageType: 'Testimony Creation', recipient: person, link: '/listtestimony' };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        console.log('Success!');
      });
  };

  const submit = (data, formRef) => {
    const owner = Meteor.user().username;
    const collectionName = Testimonies.getCollectionName();
    // const hasFile = Object.keys(uploadFile).length;
    const hasDescription =
      Object.prototype.hasOwnProperty.call(data, 'testimony') &&
      data.testimony.length !== 0;
    // console.log(hasFile);
    // console.log(hasDescription);
    // console.log(uploadFile);
    // console.log(hasFile)
    if (!hasFile && !hasDescription) {
      swal(
        'Error',
        'Provide testimony details or upload a testimony pdf!!!',
        'error',
      );
    } else if (!billNo) {
      swal('Error', 'Select a bill!!!', 'error');
    } else if (hasFile) {
      // console.log('here');
      // console.log(billNo);
      const uploadInstance = TestimonyFileCollection.insert(
        {
          file: uploadFile,
          meta: {
            billNo,
            // userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          // streams: 'dynamic',
          // chunkSize: 'dynamic',
          // allowWebWorkers: true
        },
        false,
      );

      // These are the event functions, don't need most of them, it shows where we are in the process
      uploadInstance.on('start', function () {
        console.log('Starting');
      });

      uploadInstance.on('end', function (error) {
        if (error) {
          console.log(error);
        }
        // console.log('On end File Object: ', fileObj);
      });

      uploadInstance.on('uploaded', function (error) {
        if (error) {
          console.log(error);
        }
        // console.log('uploaded: ', fileObj);
      });

      uploadInstance.on('error', function (error) {
        console.log(`Error during upload: ${error}`);
      });

      // uploadInstance.on('progress', function (progress) {
      //   console.log(`Upload Percentage: ${progress}`);
      // });

      uploadInstance.start(); // Must manually start the upload
      // console.log(uploadInstance);
      const hasPdf = true;
      const office = bills
        .filter((bill) => bill.billNo === billNo)
        .map((bill) => bill.mainOffice)[0];

      const definitionData = { ...data, office, owner, billNo, hasPdf };
      defineMethod
        .callPromise({ collectionName, definitionData })
        .catch((error) => swal('Error', error.message, 'error'))
        .then(() => {
          submitNotification(billNo, `Office Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `PIPE Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `Final Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `Writer - ${office.toUpperCase()}`);
          submitNotification(billNo, 'Admin');
          swal('Success', 'Testimony successfully submitted', 'success').then(
            function () {
              window.location = '/listtestimony';
            },
          );
          formRef.reset();
        });
      setBillNo('');
      setUploadFile({});
      setHasFile(false);
      // setBillNo('')
    } else {
      const office = bills
        .filter((bill) => bill.billNo === billNo)
        .map((bill) => bill.mainOffice)[0];
      // console.log(`office: ${office}`);
      const definitionData = { ...data, office, owner, billNo };
      defineMethod
        .callPromise({ collectionName, definitionData })
        .catch((error) => swal('Error', error.message, 'error'))
        .then(() => {
          submitNotification(billNo, `Office Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `PIPE Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `Final Approver - ${office.toUpperCase()}`);
          submitNotification(billNo, `Writer - ${office.toUpperCase()}`);
          submitNotification(billNo, 'Admin');
          swal('Success', 'Testimony successfully submitted', 'success').then(
            function () {
              window.location = '/listtestimony';
            },
          );
          formRef.reset();
        });
      setBillNo('');
    }
  };

  const billSelected = (e) => {
    setBillNo(e.target.value);
  };

  const changed = (e) => {
    const file = e.target.files[0];
    setUploadFile(file);
    setHasFile(true);
  };

  const toggleHidden = () => {
    if (hidden) setHidden(false);
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  const menuStyle = { fontWeight: 'bold' };
  const checkboxStyle = { margin: '5px' };
  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id={PAGE_IDS.SUBMIT_TESTIMONY} className="py-3">
      <AutoForm
        ref={(ref) => {
          fRef = ref;
        }}
        schema={bridge}
        onSubmit={(data) => submit(data, fRef)}
      >
        <Row className="justify-content-center">
          <Col xs={12}>
            <Col className="text-center">
              <h2>Submit Testimony</h2>
            </Col>
            <Card>
              <Card.Body>
                <Row>
                  <span style={menuStyle}>Relevant Bill</span>
                  <Col
                    id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_RELEVANT_BILL}
                    style={checkboxStyle}
                  >
                    <Form.Select onChange={(e) => billSelected(e)}>
                      <option aria-label="Blank Space" />
                      {billName.map((bill) => (
                        <option key={bill} value={bill}>
                          {bill}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <TextField
                  id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_FIRST_NAME}
                  name="firstName"
                  placeholder="Type first name here"
                />
                <TextField
                  id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_LAST_NAME}
                  name="lastName"
                  placeholder="Type last name here"
                />
                <Row>
                  <Col id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_POSITION}>
                    <SelectField
                      name="position"
                      multiple
                      checkboxes
                      transform={transform}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING}>
                    <SelectField
                      name="testifyingAs"
                      multiple
                      checkboxes
                      onClick={toggleHidden}
                      transform={transform}
                    />
                  </Col>
                </Row>
                <TextField
                  name="organization"
                  placeholder="Type organization name here"
                  className={hidden ? 'hidden' : ''}
                />
                <Row>
                  <Col
                    id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING_METHOD}
                  >
                    <SelectField
                      style={checkboxStyle}
                      name="testifyingMethod"
                      multiple
                      checkboxes
                      transform={transform}
                    />
                  </Col>
                </Row>
                <h3>Type out testimony or upload pdf file</h3>
                <LongTextField
                  id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIMONY}
                  name="testimony"
                  placeholder="Type testimony here..."
                />
                <h5>OR</h5>
                <Row className="mb-3">
                  <Col className="col-sm-1 col-form-label bold-text">
                    Upload file:{' '}
                  </Col>
                  <Col className="col-sm-9">
                    <Form.Control
                      id="testimonyfiles"
                      type="file"
                      onChange={changed}
                      accept="application/pdf"
                    />
                  </Col>
                </Row>
                <SubmitField
                  id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_SUBMIT}
                  value="Submit"
                />
                <ErrorsField />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </AutoForm>
    </Container>
  ) : (
    <Spinner>Loading.....</Spinner>
  );
};

export default SubmitTestimony;
