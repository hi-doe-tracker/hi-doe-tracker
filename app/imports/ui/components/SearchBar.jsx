import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearchWord }) => {
  const searchBarStyle = { position: 'absolute', top: '200px', right: '200px', width: '1000px', height: '10px' };
  // Sets searchWord to the inputted search word.
  const checkSearchWord = event => {
    setSearchWord(event.target.value);
  };
  return (
    <Row>
      <Col xs={10}>
        <InputGroup style={searchBarStyle} onChange={checkSearchWord}>
          <InputGroup.Text><BsSearch /></InputGroup.Text>
          <Form.Control id="inlineFormInputGroup" placeholder="Search" />
        </InputGroup>
      </Col>
    </Row>
  );
};

/* Takes in a setSearchWord function which can be used to set the search word for another component. */
SearchBar.propTypes = {
  setSearchWord: PropTypes.func.isRequired,
};

export default SearchBar;
