import React from 'react';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import TestimonyItem from '../components/TestimonyItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const ViewTestimony = () => {
  // code structure taken from list stuff file
  const { ready, testimonies } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    const testimonyItems = Testimonies.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      testimonies: testimonyItems,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <Container id={PAGE_IDS.VIEW_TESTIMONY} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Testifying</th>
                <th>Organization</th>
                <th>Testifying Method</th>
                <th>Testimony</th>
              </tr>
            </thead>
            <tbody>
              {testimonies.map((testimony) => <TestimonyItem testimony={testimony} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Testimony" />;
};

export default ViewTestimony;
