import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { UserProfiles } from '../../api/user/UserProfileCollection';

// import { TestimonyFilesCollection } from 'meteor/ostrio:files';
import {
  TestimonyFileCollection,
  subscribeTestimonyFiles,
} from '../../api/testimony/TestimonyFileCollection';

// export const TestimonyItem = React.forwardRef(({ testimony }, ref) => (
const TestimonyItem = ({ testimony }) => {
  const [position, setPosition] = useState('');
  const allowedPosition = [
    'Admin',
    'Writer',
    'PIPE Approver',
    'Final Approver',
  ];

  const { ready, readyUsr, currentUser, testimonyFiles } = useTracker(() => {
    const subscription = subscribeTestimonyFiles();

    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const subscriptionUsr = UserProfiles.subscribeUserProfiles();
    const rdy2 = subscriptionUsr.ready();
    const currUser = Meteor.user() ? Meteor.user().username : '';
    const testimonyfiles = TestimonyFileCollection.find({
      meta: { billNo: testimony.billNo },
    }).fetch();
    return {
      ready: rdy,
      readyUsr: rdy2,
      currentUser: currUser,
      testimonyFiles: testimonyfiles,
      // testimonies: testimonies,
    };
  }, []);

  useEffect(() => {
    if (currentUser !== '' && currentUser !== undefined) {
      if (readyUsr) {
        const email = currentUser;
        const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
        console.log(email);
        if (!isAdmin) {
          const pos = UserProfiles.findByEmail(email).position;
          // console.log(pos)
          setPosition(pos);
        } else {
          setPosition('Admin');
        }
      }
    }
  });

  // get link of pdfs
  let links;
  if (ready) {
    links = testimonyFiles.map((file) => [
      TestimonyFileCollection.findOne({ _id: file._id }).link(),
      file.name,
    ]);
  }
  // let getPdf = () => testimonyFiles.map(file =><a href={file.link()} target="_blank">View</a> )

  // display pdfs
  const getPdf = () => {
    if (links.length === 0) {
      return 'No PDFs';
    }
    return ready
      ? links.map((link) => (
        <p key={link[0]}>
          <a href={link[0]} target="_blank" rel="noreferrer">
            {link[1]}
          </a>
          <br />
        </p>
      ))
      : 'Empty';
  };
  return ready ? (
    <tr>
      <td>{testimony.billNo}</td>
      <td>{testimony.firstName}</td>
      <td>{testimony.lastName}</td>
      <td>{testimony.office.join(', ')}</td>
      <td>{testimony.position}</td>
      <td>{testimony.testifyingAs}</td>
      <td>{testimony.testifyingMethod}</td>
      <td>{testimony.testimony}</td>
      <td>{getPdf()}</td>
      <td>
        {allowedPosition.includes(position) ? (
          <Link id="testimony-view" to={`/edittestimony/${testimony._id}`}>
            Edit
          </Link>
        ) : (
          ''
        )}
      </td>
    </tr>
  ) : (
    <tr>
      <td>Loading</td>
    </tr>
  );
};

// Require a document to be passed to this component.
TestimonyItem.propTypes = {
  testimony: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    office: PropTypes.arrayOf(PropTypes.string),
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
