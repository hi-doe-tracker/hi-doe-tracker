import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import MiniCalendar from '../components/MiniCalendar';
import BillQuickReference from '../components/BillQuickReference';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container fluid className="px-5">
    <Row>
      <Col>
        <BillQuickReference />
      </Col>
      <Col>
        <p>placeholder</p>
      </Col>
      <Col>
        <MiniCalendar />
      </Col>
    </Row>
  </Container>
);

export default Home;
