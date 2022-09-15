import React from 'react';
import { ProgressBar, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MiniMeasureTracker = ({ darkTheme }) => {

  let color = 'light';

  if (darkTheme) {
    color = 'dark';
  }

  return (
    <Card
      bg={darkTheme ? 'dark' : null}
      text={darkTheme ? 'light' : 'dark'}
      style={{ width: '228px' }}
      className="float-end"
    >
      <Card.Header>
        Tracker
      </Card.Header>
      <ListGroup>
        <ListGroup.Item variant={color}>
          <h6>Measure Title</h6>
          <ProgressBar now={60} />
        </ListGroup.Item>
        <ListGroup.Item variant={color}>
          <h6>Measure Title</h6>
          <ProgressBar now={40} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

MiniMeasureTracker.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MiniMeasureTracker;
