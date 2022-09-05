import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
  const searchBarStyle = { position: 'absolute', top: '200px', right: '200px', width: '1000px', height: '5px' };
  return (
    <Row>
      <Col xs={10}>
        <InputGroup style={searchBarStyle}>
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
};

export default SearchBar;
