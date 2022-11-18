import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
// import { TestimonyFilesCollection } from 'meteor/ostrio:files';
import { TestimonyFileCollection, subscribeTestimonyFiles } from '../../api/testimony/TestimonyFileCollection';
import { TestimonyProgresses } from '../../api/testimonyProgress/TestimonyProgressCollection';

// export const TestimonyItem = React.forwardRef(({ testimony }, ref) => (
const TestimonyItem = ({ testimony }) => {
  const [progress, setProgress] = useState(0);
  const [checkbox1, setCheckBox1] = useState(false);
  const [checkbox2, setCheckBox2] = useState(false);
  const [checkbox3, setCheckBox3] = useState(false);
  useEffect(() => {
    if (checkbox1 && checkbox2 && checkbox3) {
      setProgress(100);
    } else if ((checkbox1 && checkbox2) || (checkbox1 && checkbox3) || (checkbox3 && checkbox2)) {
      setProgress(75);
    } else if (checkbox1 || checkbox2 || checkbox3){
      setProgress(50);
    } else {
      setProgress(0);
    }
  }, [checkbox1, checkbox2, checkbox3]);

  const { ready, testimonyFiles, testimonyProgresses } = useTracker(() => {
    const subscription = subscribeTestimonyFiles();
    const subscription2 = TestimonyProgresses.subscribeTestimonyProgress();

    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    const testimonyfiles = TestimonyFileCollection.find({ meta: { billNo: testimony.billNo } }).fetch();
    const testimonyStates = TestimonyProgresses.find({}, { sort: { associatedTestimony: 1 } }).fetch();
    return {
      ready: rdy,
      testimonyFiles: testimonyfiles,
      testimonyProgresses: testimonyStates,
    };
  }, []);

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
        <form>
          <div>
            <input type="checkbox" id="officeBox" onChange={() => setCheckBox1(!checkbox1)} />
            <label htmlFor="officeBox">Office Approval Status</label>
          </div>
          <div>
            <input type="checkbox" id="pipeBox" onChange={() => setCheckBox2(!checkbox2)} />
            <label htmlFor="officeBox">PIPE Approval Status</label>
          </div>
          <div>
            <input type="checkbox" id="finalBox" onChange={() => setCheckBox3(!checkbox3)} />
            <label htmlFor="officeBox">Final Approval Status</label>
          </div>
        </form>
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
