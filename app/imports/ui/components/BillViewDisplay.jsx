import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row, Col, ProgressBar } from 'react-bootstrap';

const BillViewDisplay = ({ billData }) => {

  if (billData.isDisabled) {
    return (
      <ListGroup.Item disabled>
        <Row>
          <Col>
            {billData.billName}
          </Col>
          <Col>
            {billData.date}
          </Col>
          <Col>
            {billData.offices}
          </Col>
          <Col>
            Progress
            <ProgressBar variant="danger" now={billData.progress} />
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
  return (
    <ListGroup.Item>
      <Row>
        <Col>
          {billData.billName}
        </Col>
        <Col>
          {billData.date}
        </Col>
        <Col>
          {billData.offices}
        </Col>
        <Col>
          Progress
          <ProgressBar now={billData.progress} />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

BillViewDisplay.propTypes = {
  billData: PropTypes.shape({
    billName: PropTypes.string,
    offices: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    progress: PropTypes.number,
    isDisabled: PropTypes.bool,
  }).isRequired,
};

export default BillViewDisplay;
