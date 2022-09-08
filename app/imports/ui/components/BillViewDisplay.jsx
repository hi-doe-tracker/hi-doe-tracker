import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { useMediaQuery } from 'usehooks-ts';

const BillViewDisplay = ({ billData }) => {
  const mobileView = useMediaQuery('(max-width: 809px)');

  if (mobileView) {
    return (
      <ListGroup.Item action href={billData.url}>
        <Row>{billData.billName}</Row>
        <Row>{billData.date}</Row>
        <Row>{billData.offices.toString()}</Row>
        <Row>Progress<ProgressBar now={billData.progress} /></Row>
        <Row><Button variant="outline-danger">Delete</Button></Row>
      </ListGroup.Item>
    );
  }
  return (
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
};

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
