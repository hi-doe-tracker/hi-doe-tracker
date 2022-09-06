import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, ProgressBar, Button } from 'react-bootstrap';

const BillViewDisplay = ({ billData }) => (
  <ListGroup.Item action href={billData.url}>
    <Row>
      <Col sm="2">{billData.billName}</Col>
      <Col sm="2">{billData.date}</Col>
      <Col sm="3">{billData.offices.toString()}</Col>
      <Col sm="3">Progress<ProgressBar now={billData.progress} /></Col>
      <Col sm="1"><Button variant="outline-danger">Delete</Button></Col>
    </Row>
  </ListGroup.Item>
);

BillViewDisplay.propTypes = {
  billData: PropTypes.shape({
    billName: PropTypes.string,
    offices: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    url: PropTypes.string,
    progress: PropTypes.number,
    isDisabled: PropTypes.bool,
  }).isRequired,
};

export default BillViewDisplay;
