import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div className="landing-background">
    <Container id={PAGE_IDS.LANDING} className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image roundedCircle src="/images/state-logo.png" width="250px" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Hawaii State Legislature</h1>
          <p>Bill & Testimony Database</p>
        </Col>

      </Row>
    </Container>
  </div>
);

export default Landing;
