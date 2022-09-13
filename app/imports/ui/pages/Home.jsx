import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import MiniCalendar from '../components/MiniCalendar';
import BillQuickReference from '../components/BillQuickReference';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container>
    <Row>
      <Col>
        <BillQuickReference />
      </Col>
      <Col xs={8}>
        <p>placeholder</p>
      </Col>
      <Col>
        <Card>
          <Card.Header>Upcoming Hearings</Card.Header>
          <ListGroup>
            <ListGroup.Item key="2">Lorem</ListGroup.Item>
          </ListGroup>
        </Card>
        <MiniCalendar />
      </Col>
    </Row>
  </Container>
);

export default Home;
