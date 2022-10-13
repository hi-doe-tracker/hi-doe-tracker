import React from 'react';
import { Card, Button, Badge, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HearingCard = ({ hearing }) => (
  <div className="p-6">
    <Card>
      <Card.Body>
        <Card.Title>
          {hearing.notice}{hearing.measureType.toUpperCase()}_{hearing.measureNumber}
        </Card.Title>
        <Card.Subtitle>
          {hearing.datetime}
        </Card.Subtitle>
      </Card.Body>
      <Card.Body>
        {hearing.description}
      </Card.Body>
      <Card.Footer>
        <Row>
          <div className="d-grid gap-2">
            <Button variant="outline-secondary">Details</Button>
            <Button variant="primary">Follow</Button>
          </div>
        </Row>
      </Card.Footer>
      <Card.Footer>
        <Badge bg="primary">Bill tag</Badge>
        <Badge bg="primary">Bill tag</Badge>
        <Badge bg="secondary">Office tag</Badge>
        <Badge bg="secondary">Office tag</Badge>
      </Card.Footer>
    </Card>
  </div>
);

HearingCard.propTypes = {
  hearing: PropTypes.shape({
    year: PropTypes.number,
    measureType: PropTypes.string,
    measureNumber: PropTypes.number,
    datetime: PropTypes.string,
    description: PropTypes.string,
    room: PropTypes.string,
    notice: PropTypes.string,
  }).isRequired,
};

export default HearingCard;
