import React from 'react';
import { ProgressBar, Card, ListGroup } from 'react-bootstrap';

const MiniMeasureTracker = () => {
  // For implementing later
  return (
    <Card style={{ width: '225px' }} className="float-end">
      <Card.Header>
        Tracker
      </Card.Header>
      <ListGroup>
        <ListGroup.Item>
          <h6>Measure Title</h6>
          <ProgressBar now={60} />
        </ListGroup.Item>
        <ListGroup.Item>
          <h6>Measure Title</h6>
          <ProgressBar now={40} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default MiniMeasureTracker;
