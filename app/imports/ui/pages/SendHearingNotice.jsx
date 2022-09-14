import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, DateField } from 'uniforms-bootstrap5';
import { default as ReactSelect, components } from "react-select";
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  to: String,
  cc: String,
  bcc: String,
  from: String,
  dateOfHearing: Date,
  subject: String,
  message: String,
});

const officeOptions = [
  { value: "all", label: "All" },
  { value: "deputy", label: "DEPUTY" },
  { value: "ocid", label: "OCID" },
  { value: "ofo", label: "OFO" },
  { value: "ofs", label: "OFS" },
  { value: "oits", label: "OITS" },
  { value: "osip", label: "OSIP" },
  { value: "osss", label: "OSSS" },
  { value: "otm", label: "OTM" },
];

const billOptions = [
  { value: "hb-150", label: "HB150" },
  { value: "sb-234", label: "SB234" },
  { value: "hb-563", label: "HB563" },
];

const bridge = new SimpleSchema2Bridge(formSchema);

// Creates dropdown options for offices and bills select form
// From: https://medium.com/geekculture/creating-multi-select-dropdown-with-checkbox-in-react-792ff2464ef3
const Option = (props) => {
  return (
      <div>
        <components.Option {...props}>
          <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
  );
};

/* Renders the AddStuff page for adding a document. */
const SendHearingNotice = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { to, cc, bcc, from, subject, message } = data;
    const owner = Meteor.user().username;
    const collectionName = Stuffs.getCollectionName();
    const definitionData = { to, cc, bcc, from, subject, message, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_STUFF} className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Send Hearing Notice</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Row>
                    <Col><TextField name="to" placeholder="admin@foo.com"/></Col>
                    <Col><TextField name="from" placeholder="admin@foo.com"/></Col>
                </Row>
                <Row>
                  <Col><TextField name="cc" placeholder="user@foo.com"/></Col>
                  <Col><TextField name="bcc"/></Col>
                </Row>
                <Row>
                  <Col>
                    <div class="mb-3 required">
                    <label>Offices relevant</label>
                    <ReactSelect
                        options={officeOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option
                        }}
                        allowSelectAll={true}
                    />
                    </div>
                  </Col>
                  <Col>
                    <div className="mb-3 required">
                    <label>Bills to be heard</label>
                    <ReactSelect
                        options={billOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option
                        }}
                        allowSelectAll={true}
                    />
                    </div>
                  </Col>
                </Row>
                <DateField name="dateOfHearing" min={new Date(2022,9,12)}></DateField>
                <TextField name="subject" placeholder="Subject"/>
                <LongTextField name="message" placeholder="Type a message..."/>
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
