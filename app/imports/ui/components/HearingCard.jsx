import React, { useState, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Card, Button, Badge, Row, Modal, Accordion, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Hearings } from '../../api/hearing/HearingCollection';
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { getEmailHtml } from './getEmailHtml';

const HearingCard = ({ hearing, showInitial }) => {
  const { ready, hearings } = useTracker(() => {
    const hearingsSubscription = Hearings.subscribeHearings();
    const rdy = hearingsSubscription.ready();
    const hearingItems = Hearings.find({}).fetch();
    return {
      hearings: hearingItems,
      ready: rdy,
    };
  }, []);
  const ref = useRef(null);
  const [show, setShow] = useState(showInitial);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getFilteredBills = () => hearings.filter(value => value.notice === hearing.notice);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onlyManoa = ref.current.manoa.checked;
    const other = ref.current.other.checked;
    const recepient = ref.current.email.value;
    console.log(recepient);
    if (onlyManoa && other) {
      Meteor.call(
        'sendEmail',
        hearing.notice,
        getEmailHtml('both', hearing, Meteor.user().username, getFilteredBills()),
        recepient,
        (error, res) => {
          if (error) {
            swal('Error', error, 'error');
          } else if (res) {
            swal('Success', 'Email Sent Successfully!', 'success');
          }
        },
      );
    } else if (onlyManoa) {
      Meteor.call(
        'sendEmail',
        hearing.notice,
        getEmailHtml('manoa', hearing, Meteor.user().username, getFilteredBills()),
        recepient,
        (error, res) => {
          if (error) {
            swal('Error', error, 'error');
          } else if (res) {
            swal('Success', 'Email Sent Successfully!', 'success');
          }
        },
      );
    } else {
      Meteor.call(
        'sendEmail',
        hearing.notice,
        getEmailHtml('other', hearing, Meteor.user().username, getFilteredBills()),
        recepient,
        (error, res) => {
          if (error) {
            swal('Error', error, 'error');
          } else if (res) {
            swal('Success', 'Email Sent Successfully!', 'success');
            console.log(res);
          }
        },
      );
    }

    ref.current.reset();

  };

  return (ready ? (
    <div className="p-6">
      <Card>
        <Card.Body>
          <Card.Title>
            {hearing.notice.split('_').join(' ')}
          </Card.Title>
          <Card.Subtitle>
            {hearing.datetime}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Row>
            <div className="d-grid gap-2">
              <Button id={COMPONENT_IDS.HEARING_CARD_DETAILS} variant="outline-secondary" onClick={handleShow}>Details</Button>
              <Button variant="primary">Follow</Button>
              <Button variant="danger" onClick={() => setModalShow(true)}>SEND MAIL</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{hearing.notice}</Modal.Title>
                </Modal.Header>
                <Modal.Body><b>Hearing date:</b> {hearing.datetime}</Modal.Body>
                <Modal.Body><b>Location:</b> {hearing.room}</Modal.Body>
                <Modal.Body>
                  <b>Bills to be heard:</b>
                  <Card>
                    <Accordion id={COMPONENT_IDS.HEARING_CARD_ACCORDION} alwaysOpen>
                      {getFilteredBills().map((bill, index) => (
                        <Accordion.Item eventKey={`${index}`}>
                          <Accordion.Header>
                            {bill.measureType.toUpperCase()} {bill.measureNumber}
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

              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Send Email
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form ref={ref} onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="FOR UH SYSTEM, UH HILO, UH WEST OAHU, & UH COMMUNITY COLLEGE" name="other" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="FOR UH Manoa Only" name="manoa" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Recipient @</Form.Label>
                      <Form.Control name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setModalShow(false)}>Close</Button>
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
  showInitial: PropTypes.bool.isRequired,
};

export default HearingCard;
