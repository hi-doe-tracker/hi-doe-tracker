import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
  const searchBarStyle = { position: 'absolute', top: '200px', right: '200px', width: '1000px', height: '10px' };
  return (
    <Row>
      <Col xs={10}>
        <InputGroup style={searchBarStyle}>
          <InputGroup.Text><BsSearch /></InputGroup.Text>
          <Form.Control id="inlineFormInputGroup" placeholder="Search" />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;
