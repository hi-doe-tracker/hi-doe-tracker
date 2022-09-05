import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Container, Row, Col, Button } from 'react-bootstrap';

const SearchBar = () => (
  <Container>
    <Row>
      <Col xs={11} />
      <Col>
        <Button variant="outline-dark">
          <BsSearch />
        </Button>
      </Col>
    </Row>
  </Container>
);

export default SearchBar;
