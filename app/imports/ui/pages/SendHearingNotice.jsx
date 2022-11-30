import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, DateField } from 'uniforms-bootstrap5';
import Select from 'react-select';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Notices } from '../../api/notice/NoticeCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Notifications } from '../../api/notification/NotificationCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  to: String,
  from: String,
  cc: {
    type: String,
    optional: true,
    defaultValue: '',
  },
  bcc: {
    type: String,
    optional: true,
    defaultValue: '',
  },
  dateOfHearing: Date,
  subject: String,
  message: String,
});

const officeOptions = [
  { value: 'ALL', label: 'All' },
  { value: 'DEPUTY', label: 'DEPUTY' },
  { value: 'OCID', label: 'OCID' },
  { value: 'OFO', label: 'OFO' },
  { value: 'OFS', label: 'OFS' },
  { value: 'OITS', label: 'OITS' },
  { value: 'OSIP', label: 'OSIP' },
  { value: 'OSSS', label: 'OSSS' },
  { value: 'OTM', label: 'OTM' },
];

const billOptions = [
  { value: 'hb-150', label: 'HB150' },
  { value: 'sb-234', label: 'SB234' },
  { value: 'hb-563', label: 'HB563' },
];

const bridge = new SimpleSchema2Bridge(formSchema);

const SendHearingNotice = () => {

  // function that validated email. Returns true if emails are valid, else returns false
  function validateEmail(cc, bcc, from, to) {
    const validate = /@foo\.com$/;
    if (cc) {
      if (bcc) {
        return validate.test(to) && validate.test(from) && validate.test(cc) && validate.test(bcc);
      }
      return validate.test(to) && validate.test(from) && validate.test(cc);
    } if (bcc) {
      return validate.test(to) && validate.test(from) && validate.test(bcc);
    }

    return validate.test(to) && validate.test(from);

  }

  // On submit, create new notification.
  const submitNotification = (hearingDate, person) => {
    const collectionName = Notifications.getCollectionName();
    const definitionData = { message: `Hearing @ ${hearingDate.toLocaleString()}`,
      messageType: 'New Hearing', recipient: person, link: '/view-hearings' };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        console.log('Success!');
      });
  };

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { to, cc, bcc, from, mainOffice, dateOfHearing, subject, message } = data;
    const owner = Meteor.user().username;
    const collectionName = Notices.getCollectionName();
    const validation = validateEmail(cc, bcc, from, to);
    console.log(validation);
    if (validation) {
      const definitionData = { to, cc, bcc, from, mainOffice, dateOfHearing, subject, message, owner };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          // Submits a notification to people emailed.
          submitNotification(dateOfHearing, to);
          if (cc !== undefined) {
            submitNotification(dateOfHearing, cc);
          }
          if (bcc !== undefined) {
            submitNotification(dateOfHearing, bcc);
          }
          console.log(mainOffice);
          swal('Success', 'Notice successfully sent', 'success');
          formRef.reset();
        });
    } else {
      swal('Invalid Email', 'One or more email fields are invalid', 'error');
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.SEND_HEARING_NOTICE} className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Send Hearing Notification</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Row>
                    <Col><TextField id="to" name="to" placeholder="Email address" /></Col>
                    <Col><TextField id="from" name="from" placeholder="Email address" /></Col>
                  </Row>
                  <Row>
                    <Col><TextField id="cc" name="cc" placeholder="Email address" /></Col>
                    <Col><TextField id="bcc" name="bcc" /></Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3 required">
                        <span>Main Office</span>
                        <Select id="mainOffice" name="mainOffice" options={officeOptions} />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3 required">
                        <span>Sub Offices</span>
                        <Select id="subOffice" name="subOffice" isMulti options={officeOptions} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3 required">
                        <span>Bills to be heard</span>
                        <Select
                          isMulti
                          options={billOptions}
                        />
                      </div>
                    </Col>
                    <Col>
                      <DateField name="dateOfHearing" min={new Date(2022, 9, 12)} />
                    </Col>
                  </Row>
                  <Row>
                    <TextField id="subject" name="subject" placeholder="Subject" />
                  </Row>
                  <Row>
                    <LongTextField name="message" placeholder="Type a message..." />
                  </Row>
                  <SubmitField id="sub" value="Submit" />
                  <ErrorsField />
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default SendHearingNotice;
