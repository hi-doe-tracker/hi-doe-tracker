import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * AdminCreate component is similar to signin component, but we create a new user instead.
 */

const AdminCreate = () => {
  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    position: {
      type: String,
      allowedValues: ['Secretary', 'Writer', 'Office Approver', 'PIPE Approver', 'Final Approver', 'Processor', 'Admin'],
      defaultValue: 'Writer',
    },
    assignedOffice: {
      type: String,
      allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
      defaultValue: 'DEPUTY',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const navigate = useNavigate();

  /* Handle SignUp submission. Create user account and a profile entry. */
  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'User added successfully', 'success');
        // Navigates to manage accounts page.
        navigate('/admin/manageaccounts');
      });
  };
  return (
    <Container id={PAGE_IDS.ADMIN_CREATE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Create an account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <SelectField id="position" name="position" />
                <SelectField id="office" name="assignedOffice" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreate;
