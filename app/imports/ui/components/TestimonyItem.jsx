import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
// import { TestimonyFilesCollection } from 'meteor/ostrio:files';
import { TestimonyFileCollection, subscribeTestimonyFiles } from '../../api/testimony/TestimonyFileCollection';
import { TestimonyProgresses } from '../../api/testimonyProgress/TestimonyProgressCollection';
import { defineMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, BoolField, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';

const bridge = new SimpleSchema2Bridge(TestimonyProgresses.getSchema());

// export const TestimonyItem = React.forwardRef(({ testimony }, ref) => (
const TestimonyItem = ({ testimony }) => {
  const [progress, setProgress] = useState(0);
  const [checkbox1, setCheckBox1] = useState(false);
  const [checkbox2, setCheckBox2] = useState(false);
  const [checkbox3, setCheckBox3] = useState(false);
  const [initialState, setInitialState] = useState(true);

  const { ready, testimonyFiles, testimonyProgress } = useTracker(() => {
    const subscription = subscribeTestimonyFiles();
    const subscription2 = TestimonyProgresses.subscribeTestimonyProgress();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    const testimonyfiles = TestimonyFileCollection.find({ meta: { billNo: testimony.billNo } }).fetch();
    const testimonyStates = TestimonyProgresses.find({ associatedTestimony: testimony._id }).fetch();
    const testimonyState = testimonyStates[0];
    return {
      ready: rdy,
      testimonyFiles: testimonyfiles,
      testimonyProgress: testimonyState,
    };
  }, []);

  // On submit, insert the data.
  const submit = () => {
    const collectionName = TestimonyProgresses.getCollectionName();
    const definitionData = { associatedTestimony: testimony._id, officeApproval: false, pipeApproval: false, finalApproval: false };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        console.log('Success!');
      });
  };

  // On update, updates the testimony progress data.
  const updateProgress = (data) => {
    const collectionName = TestimonyProgresses.getCollectionName();
    const updateData = { id: testimonyProgress._id, ...data };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  useEffect(() => {
    if (checkbox1 && checkbox2 && checkbox3) {
      setProgress(100);
    } else if ((checkbox1 && checkbox2) || (checkbox1 && checkbox3) || (checkbox3 && checkbox2)) {
      setProgress(75);
    } else if (checkbox1 || checkbox2 || checkbox3) {
      setProgress(50);
    } else {
      setProgress(25);
    }
  }, [checkbox1, checkbox2, checkbox3]);

  // Restores the state of the testimony's progress from the last session.
  if (ready && initialState) {
    if (testimonyProgress === undefined) {
      // Adds the testimony progress if the testimony does not have a progress associated with it.
      submit();
    } else {
      setCheckBox1(testimonyProgress.officeApproval);
      setCheckBox2(testimonyProgress.pipeApproval);
      setCheckBox3(testimonyProgress.finalApproval);
    }
    setInitialState(false);
  }

  // Changes the state of the checkbox and also updates the testimony's progress.
  const changeCheckbox = (checkboxNumber) => {
    const updateData = { _id: testimonyProgress._id, associatedTestimony: testimony._id, officeApproval: testimonyProgress.officeApproval,
      pipeApproval: testimonyProgress.pipeApproval, finalApproval: testimonyProgress.finalApproval };
    if (checkboxNumber === 1) {
      setCheckBox1(!checkbox1);
      updateData.officeApproval = checkbox1;
      updateProgress(updateData);
    } else if (checkboxNumber === 2) {
      setCheckBox2(!checkbox2);
      updateData.pipeApproval = checkbox2;
      updateProgress(updateData);
    } else if (checkboxNumber === 3) {
      (setCheckBox3(!checkbox3));
      updateData.finalApproval = checkbox3;
      updateProgress(updateData);
    }
  };

  // get link of pdfs
  let links;
  if (ready) {
    links = testimonyFiles.map((file) => [TestimonyFileCollection.findOne({ _id: file._id }).link(), file.name]);
  }
  // let getPdf = () => testimonyFiles.map(file =><a href={file.link()} target="_blank">View</a> )

  // display pdfs
  const getPdf = () => {
    if (links.length === 0) {
      return 'No PDFs';
    }
    return ready ? links.map(link => <p key={link[0]}><a href={link[0]} target="_blank" rel="noreferrer">{link[1]}</a><br /></p>) : 'Empty';
  };
  return ready ? (
    <tr>
      <td>{testimony.billNo}</td>
      <td>{testimony.firstName}</td>
      <td>{testimony.lastName}</td>
      <td>{testimony.position}</td>
      <td>{testimony.testifyingAs}</td>
      <td>{testimony.testifyingMethod}</td>
      <td>{testimony.testimony}</td>
      <td>{getPdf()}</td>
      <td><Link id="testimony-view" to={`/edittestimony/${testimony._id}`}>Edit</Link></td>
      <td>
        Progress<ProgressBar now={progress} /><br />
        <AutoForm schema={bridge} onSubmit={data => updateProgress(data)} model={testimonyProgress}>
          <Row>
            <Col><BoolField name="officeApproval" /></Col>
            <Col><SubmitField value="Submit" /></Col>
            <ErrorsField />
          </Row>
          <Row>
            <Col><BoolField name="pipeApproval" /></Col>
          </Row>
          <Row>
            <Col><BoolField name="finalApproval" /></Col>
          </Row>
        </AutoForm>
      </td>
    </tr>
  ) : <tr><td>Loading</td></tr>;
};

// Require a document to be passed to this component.
TestimonyItem.propTypes = {
  testimony: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    testifyingAs: PropTypes.string,
    billNo: PropTypes.string,
    // organization: PropTypes.string,
    testifyingMethod: PropTypes.string,
    testimony: PropTypes.string,
    hasPdf: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default TestimonyItem;
