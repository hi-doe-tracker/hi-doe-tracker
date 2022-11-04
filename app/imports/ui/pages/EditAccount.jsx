import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const bridge = new SimpleSchema2Bridge(UserProfiles._schema);

/* Renders the EditAccount page for editing a single document. */
const EditAccount = () => {

  // DOE office types
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
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to UserProfiles documents.
    const subscription = UserProfiles.subscribeUserProfiles();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = UserProfiles.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { email, password, firstName, lastName, position, assignedOffice } = data;
    const collectionName = UserProfiles.getCollectionName();
    const updateData = { id: _id, email, password, firstName, lastName, position, assignedOffice };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Profile updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_ACCOUNT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Account</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="email" />
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="position" />
                <SelectField name="assignedOffice" placeholder="--" options={officeOptions} />
                <SubmitField value="Update Profile" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditAccount;
