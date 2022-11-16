import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
// import { TestimonyFilesCollection } from 'meteor/ostrio:files';
import { TestimonyFileCollection, subscribeTestimonyFiles } from '../../api/testimony/TestimonyFileCollection';

// export const TestimonyItem = React.forwardRef(({ testimony }, ref) => (
const TestimonyItem = ({ testimony }) => {
  const { ready, testimonyFiles } = useTracker(() => {
    const subscription = subscribeTestimonyFiles();

    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const testimonyfiles = TestimonyFileCollection.find({ meta: { billNo: testimony.billNo } }).fetch();
    return {
      ready: rdy,
      testimonyFiles: testimonyfiles,
      // testimonies: testimonies,
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
        Progress<ProgressBar now={100} /><br />
        <form>
          <div>
            <input type="checkbox" value="true" id="officeBox" />
            <label htmlFor="officeBox">Office Approval Status</label>
          </div>
          <div>
            <input type="checkbox" value="true" id="pipeBox" />
            <label htmlFor="officeBox">PIPE Approval Status</label>
          </div>
          <div>
            <input type="checkbox" value="true" id="finalBox" />
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
