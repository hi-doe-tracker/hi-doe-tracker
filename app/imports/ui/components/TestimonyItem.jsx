import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TestimonyItem = ({ testimony }) => (
  <tr>
    <td>{testimony.firstName}</td>
    <td>{testimony.lastName}</td>
    <td>{testimony.position}</td>
    <td>{testimony.testifying}</td>
    <td>{testimony.testifyingMethod}</td>
    <td>{testimony.testimony}</td>
    <td><Link id="testimony-view" to={`/edittestimony/${testimony._id}`}>Edit or Save</Link></td>
  </tr>
);

// Require a document to be passed to this component.
TestimonyItem.propTypes = {
  testimony: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    testifying: PropTypes.string,
    // organization: PropTypes.string,
    testifyingMethod: PropTypes.string,
    testimony: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default TestimonyItem;
