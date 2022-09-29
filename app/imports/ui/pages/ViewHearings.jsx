import React from 'react';
import { Col, Container, Row, Card, Badge, Button } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { Stuffs } from '../../api/stuff/StuffCollection';
// import StuffItem from '../components/StuffItem';
// import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a Card group containing all of the Hearing documents. Use <ViewHearings> to render each card. */
const ViewHearings = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
// const { ready, stuffs } = useTracker(() => {
//   // Note that this subscription will get cleaned up
//   // when your component is unmounted or deps change.
//   // Get access to Stuff documents.
//   const subscription = Stuffs.subscribeStuff();
//   // Determine if the subscription is ready
//   const rdy = subscription.ready();
//   // Get the Stuff documents
//   const stuffItems = Stuffs.find({}, { sort: { name: 1 } }).fetch();
//   return {
//     stuffs: stuffItems,
//     ready: rdy,
//   };
// }, []);
  const hearing = 'hearing1';
  return (
    <Container id={PAGE_IDS.VIEW_HEARINGS} className="py-3">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Hearings</h2>
        </Col>
      </Row>
      <Row lg={3} md={2} xs={1} className="g-4">
        <Card>
          <Card.Body>
            <Card.Title>08/09/2022 Hearing</Card.Title>
            <Card.Subtitle>2:00 PM</Card.Subtitle>
            <Card.Text>Filler Text. This is a description on what this hearing is about. Location, bills to be heardetc...</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <div className="d-grid gap-2">
                <Button variant="outline-secondary">Details</Button>
                <Button variant="outline-success">Follow</Button>
              </div>
            </Row>
          </Card.Footer>
          <Card.Footer>
            <Badge bg="primary">HB 150</Badge>
            <Badge bg="primary">SB 152</Badge>
            <Badge bg="secondary">BOE</Badge>
            <Badge bg="secondary">OSSS</Badge>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>08/09/2022 Hearing</Card.Title>
            <Card.Subtitle>2:00 PM</Card.Subtitle>
            <Card.Text>Filler Text. This is a description on what this hearing is about. Location, bills to be heardetc...</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <div className="d-grid gap-2">
                <Button variant="outline-secondary">Details</Button>
                <Button variant="outline-success">Follow</Button>
              </div>
            </Row>
          </Card.Footer>
          <Card.Footer>
            <Badge bg="primary">HB 150</Badge>
            <Badge bg="primary">SB 152</Badge>
            <Badge bg="secondary">BOE</Badge>
            <Badge bg="secondary">OSSS</Badge>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>{hearing}</Card.Title>
            <Card.Subtitle>2:00 PM</Card.Subtitle>
            <Card.Text>Filler Text. This is a description on what this hearing is about. Location, bills to be heardetc...</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <div className="d-grid gap-2">
                <Button variant="outline-secondary">Details</Button>
                <Button variant="outline-success">Follow</Button>
              </div>
            </Row>
          </Card.Footer>
          <Card.Footer>
            <Badge bg="primary">HB 150</Badge>
            <Badge bg="primary">SB 152</Badge>
            <Badge bg="secondary">BOE</Badge>
            <Badge bg="secondary">OSSS</Badge>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};

export default ViewHearings;
