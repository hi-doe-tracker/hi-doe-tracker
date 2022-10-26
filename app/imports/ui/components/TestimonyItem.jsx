import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {TestimonyFileCollection, subscribeTestimonyFiles} from '../../api/testimony/TestimonyFileCollection';

// export const TestimonyItem = React.forwardRef(({ testimony }, ref) => (
const TestimonyItem = ({ testimony }) => {
  // const [testimonyFiles, setTestimonyFiles] = useState([]);
  // useEffect(()=> {
  //   console.log(testimony)
  //   let link = TestimonyFileCollection.find({});
  //   console.log(link) 
  // }, [])
  const { ready, testimonyFiles} = useTracker(() => {
    const subscription = subscribeTestimonyFiles();

    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the bill data from DB.
    // const billDoc = Bills.findDoc(_id);
    const testimonyFiles = TestimonyFileCollection.find({}).fetch();
    // console.log(testimonyFiles)
    // // if (rdy){
    //   console.log(billDoc);
    //   const testimonies = Testimonies.find({billNo: billDoc.billNo}).fetch();
    // // }
    return {
      ready: rdy,
      testimonyFiles: testimonyFiles,
      // testimonies: testimonies,
    };
  }, [] );
  return(
  <tr>
    <td>{testimony.firstName}</td>
    <td>{testimony.lastName}</td>
    <td>{testimony.position}</td>
    <td>{testimony.testifyingAs}</td>
    <td>{testimony.testifyingMethod}</td>
    <td>{testimony.testimony}</td>
    <td><Link id="testimony-view" to={`/edittestimony/${testimony._id}`}>Edit</Link></td>
  </tr>
  );
}

// Require a document to be passed to this component.
TestimonyItem.propTypes = {
  testimony: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    testifyingAs: PropTypes.string,
    // organization: PropTypes.string,
    testifyingMethod: PropTypes.string,
    testimony: PropTypes.string,
    hasPdf: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default TestimonyItem;
