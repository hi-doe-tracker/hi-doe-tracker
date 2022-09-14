import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { useMediaQuery } from 'usehooks-ts';
import { LinkContainer } from 'react-router-bootstrap';

const BillViewDisplay = ({ billData }) => {
  const mobileView = useMediaQuery('(max-width: 809px)');

  if (mobileView) {
    return (
      <LinkContainer to="/viewbill">
        <ListGroup.Item action href={billData.url}>
          <Row><Col>{billData.billName}</Col></Row>
          <Row><Col>{billData.date}</Col></Row>
          <Row><Col>{billData.offices.toString()}</Col></Row>
          <Row><Col>Progress<ProgressBar now={billData.progress} /><br /></Col></Row>
          <Row><Col><Button variant="outline-danger">Delete</Button></Col></Row>
        </ListGroup.Item>
      </LinkContainer>
    );
  }
  return (
    <LinkContainer to="/viewbill">
      <ListGroup.Item action href={billData.url}>
        <Row>
          <Col sm="2">{billData.billName}</Col>
          <Col sm="2">{billData.date}</Col>
          <Col sm="3">{billData.offices.toString()}</Col>
          <Col sm="3">Progress<ProgressBar now={billData.progress} /></Col>
          <Col sm="1"><Button variant="outline-danger">Delete</Button></Col>
        </Row>
      </ListGroup.Item>
    </LinkContainer>
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
