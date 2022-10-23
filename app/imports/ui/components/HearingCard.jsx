import React, { useState } from 'react';
import { Card, Button, Badge, Row, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HearingCard = ({ hearing }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return(
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
        {hearing.description.substring(0,150) + "..."}
      </Card.Body>
      <Card.Footer>
        <Row>
          <div className="d-grid gap-2">
            <Button variant="outline-secondary" onClick={handleShow}>Details</Button>
            <Button variant="primary">Follow</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{hearing.notice}{hearing.measureType.toUpperCase()}_{hearing.measureNumber}</Modal.Title>
              </Modal.Header>
              <Modal.Body><b>Hearing date:</b> {hearing.datetime}</Modal.Body>
              <Modal.Body><b>Location:</b> {hearing.room}</Modal.Body>
              <Modal.Body><b>Description:</b> {hearing.description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
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
};

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
