import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const BillViewDisplay = ({ billData }) => (
  <ListGroup.Item>
    {`${billData.name}: ${billData.offices}`}
  </ListGroup.Item>
);

BillViewDisplay.propTypes = {
  billData: PropTypes.shape({
    name: PropTypes.string,
    offices: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BillViewDisplay;
