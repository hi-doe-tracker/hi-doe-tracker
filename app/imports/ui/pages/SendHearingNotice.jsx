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
  { value: 'all', label: 'All' },
  { value: 'deputy', label: 'DEPUTY' },
  { value: 'ocid', label: 'OCID' },
  { value: 'ofo', label: 'OFO' },
  { value: 'ofs', label: 'OFS' },
  { value: 'oits', label: 'OITS' },
  { value: 'osip', label: 'OSIP' },
  { value: 'osss', label: 'OSSS' },
  { value: 'otm', label: 'OTM' },
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

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { to, cc, bcc, from, dateOfHearing, subject, message } = data;
    const owner = Meteor.user().username;
    const collectionName = Notices.getCollectionName();
    const validation = validateEmail(cc, bcc, from, to);
    console.log(validation);
    if (validation) {
      const definitionData = { to, cc, bcc, from, dateOfHearing, subject, message, owner };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
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
          <Col className="text-center"><h2>Send Hearing Notice</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Row>
                    <Col><TextField name="to" placeholder="Email address" /></Col>
                    <Col><TextField name="from" placeholder="Email address" /></Col>
                  </Row>
                  <Row>
                    <Col><TextField name="cc" placeholder="Email address" /></Col>
                    <Col><TextField name="bcc" /></Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3 required">
                        <span>Relevant offices</span>
                        <Select
                          options={officeOptions}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3 required">
                        <span>Bills to be heard</span>
                        <Select
                          options={billOptions}
                        />
                      </div>
                    </Col>
                  </Row>
                  <DateField name="dateOfHearing" min={new Date(2022, 9, 12)} />
                  <TextField name="subject" placeholder="Subject" />
                  <LongTextField name="message" placeholder="Type a message..." />
                  <SubmitField value="Submit" />
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
