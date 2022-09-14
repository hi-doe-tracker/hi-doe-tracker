import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={5}>
        <Image roundedCircle src="/images/state-logo.png" width="250px" />
      </Col>

      <Col xs={6} className="d-flex flex-column justify-content-center">
        <h1>Hawaii State Legislature</h1>
        <p>Key portal for to get informed and involved in the legislative process.
          The site is geared toward providing quick and easy access to the information
          you need in order to participate in the lawmaking process.
        </p>
      </Col>

    </Row>
  </Container>
);

export default Landing;
