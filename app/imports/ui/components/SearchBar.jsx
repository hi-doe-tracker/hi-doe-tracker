import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => (
  <Row>
    <Col xs={11}>
      <InputGroup>
        <InputGroup.Text><BsSearch /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </InputGroup>
    </Col>
  </Row>
);

export default SearchBar;
