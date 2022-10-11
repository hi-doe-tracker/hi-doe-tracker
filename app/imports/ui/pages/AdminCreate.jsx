import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  // const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    position: {
      type: String,
      allowedValues: ['Secretary', 'Writer', 'Office Approver', 'PIPE Approver', 'Final Approver', 'Processor', 'Admin']
    },
    office: {
      type: String,
      allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM', 'Admin']
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry. */
  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .catch((err) => setError(err.reason));
    return <Navigate to="/admin/createaccount" />;
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  // if (redirectToReferer) {
  //   return <Navigate to="/add" />;
  // }
  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3">
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
                <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_POSITION} name="position" placeholder="Choose Position"/>
                <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_OFFICE} name="office" placeholder="Choose Office"/>
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
