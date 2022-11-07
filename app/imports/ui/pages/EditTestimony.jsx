import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Testimonies._schema);

/* Renders the EditTestimony page for editing a single document. */
const EditTestimony = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Testimony documents.
    const subscription = Testimonies.subscribeTestimony();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Testimonies.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, position, testifyingAs, organization, testifyingMethod, testimony } = data;
    const collectionName = Testimonies.getCollectionName();
    const updateData = { id: _id, firstName, lastName, position, testifyingAs, organization, testifyingMethod, testimony };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Testimony updated successfully', 'success').then(function () {
        window.location = ('/listtestimony');
      }));
  };
  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id={PAGE_IDS.EDIT_TESTIMONY} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Testimony</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <SelectField name="position" multiple checkboxes transform={transform} />
                <SelectField name="testifyingAs" multiple checkboxes transform={transform} />
                <TextField name="organization" />
                <SelectField name="testifyingMethod" multiple checkboxes transform={transform} />
                <TextField name="testimony" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditTestimony;
