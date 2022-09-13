import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px', paddingBottom: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Row>
          <Col className="text-center">
            Hawaii State Department of Education <br />
            1390 Miller St. <br />
            Honolulu, HI 96813 <br />
          </Col>
          <Col className="text-center">
            Contact Information: <br />
            Phone: 808-784-6200 <br />
            Email: doeinfo@k12.hi.us <br />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
