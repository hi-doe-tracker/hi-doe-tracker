import React, { useState } from 'react';
import { Card, Button, Badge, Row, Modal, Accordion } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Hearings } from '../../api/hearing/HearingCollection';
import LoadingSpinner from './LoadingSpinner';

const HearingCard = ({ hearing }) => {
  const { ready, hearings } = useTracker(() => {
    const hearingsSubscription = Hearings.subscribeHearings();
    const rdy = hearingsSubscription.ready();
    const hearingItems = Hearings.find({}).fetch();
    return {
      hearings: hearingItems,
      ready: rdy,
    };
  }, []);

  const [show, setShow] = useState(false);
  const dot = '...';
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFilteredBills = () => hearings.filter(value => value.notice === hearing.notice);

  return (ready ? (
    <div className="p-6">
      <Card>
        <Card.Body>
          <Card.Title>
            {hearing.notice}
          </Card.Title>
          <Card.Subtitle>
            {hearing.datetime}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Row>
            <div className="d-grid gap-2">
              <Button variant="outline-secondary" onClick={handleShow}>Details</Button>
              <Button variant="primary">Follow</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{hearing.notice}</Modal.Title>
                </Modal.Header>
                <Modal.Body><b>Hearing date:</b> {hearing.datetime}</Modal.Body>
                <Modal.Body><b>Location:</b> {hearing.room}</Modal.Body>
                <Modal.Body>
                  <b>Bills to be heard:</b>
                  <Card>
                    <Accordion alwaysOpen>
                      {getFilteredBills().map((bill, index) => (
                        <Accordion.Item eventKey={`${index}`}>
                          <Accordion.Header>
                            {bill.measureType.toUpperCase()}_{bill.measureNumber}
                          </Accordion.Header>
                          <Accordion.Body>
                            {bill.description}
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card>
                </Modal.Body>
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
  ) : <LoadingSpinner message="Loading Hearing" />);
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
