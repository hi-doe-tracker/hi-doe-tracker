import React, { useState } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Select from 'react-select';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// Test data for bills
const billOptions = [
  { value: 'hb-150', label: 'HB150' },
  { value: 'sb-234', label: 'SB234' },
  { value: 'hb-563', label: 'HB563' },
];

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  position: {
    type: String,
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
  testifying: {
    type: String,
    allowedValues: ['As an individual', 'On behalf of an organization'],
  },
  organization: {
    type: String,
    optional: true,
  },
  testifyingMethod: {
    type: String,
    allowedValues: ['Remotely via Zoom during the hearing & submitting written testimony', 'Written testimony only'],
  },
  testimony: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Submit Testimony page for adding a document. */
const SubmitTestimony = () => {
  const submit = (data, formRef) => {
    const owner = Meteor.user().username;
    const collectionName = Testimonies.getCollectionName();
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Testimony successfully submitted', 'success');
        formRef.reset();
        // send to view testimony
      });
  };

  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => {
    if (hidden) setHidden(false);
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  const menuStyle = { fontWeight: 'bold' };
  return (
    <Container id={PAGE_IDS.SUBMIT_TESTIMONY} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center"><h2>Submit Testimony</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <div className="mb-3 required">
                  <span style={menuStyle}>Relevant Bill</span>
                  <Select
                    options={billOptions}
                  />
                </div>
                <TextField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_FIRST_NAME} name="firstName" placeholder="Type first name here" />
                <TextField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_LAST_NAME} name="lastName" placeholder="Type last name here" />
                <SelectField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_POSITION} name="position" multiple checkboxes />
                <SelectField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING} name="testifying" multiple checkboxes onClick={toggleHidden} />
                <TextField name="organization" placeholder="Type organization name here" className={hidden ? 'hidden' : ''} />
                <SelectField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING_METHOD} name="testifyingMethod" multiple checkboxes />
                <h3>Type out testimony or upload pdf file</h3>
                <LongTextField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIMONY} name="testimony" placeholder="Type testimony here..." />
                <h5>OR</h5>
                <Row className="mb-3">
                  <Col className="col-sm-1 col-form-label bold-text">Upload file: </Col>
                  <Col className="col-sm-9">
                    <Form.Control type="file" accept="application/pdf" />
                  </Col>
                </Row>
                <SubmitField id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_SUBMIT} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitTestimony;
