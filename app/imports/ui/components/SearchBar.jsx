import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const SearchBar = ({ setSearchWord }) => {
  const mobileView = useMediaQuery('(max-width: 760px)');
  const searchBarStyle = { margin: 'auto', top: '100px', right: '-100px', width: '100%' };
  const searchBarStyleMobile = { margin: 'auto', top: '100px', right: '-50px', width: '80%' };

  // Sets searchWord to the inputted search word.
  const checkSearchWord = event => {
    setSearchWord(event.target.value);
  };
  // Modifies search bar UI based on screen dimensions.
  if (mobileView) {
    return (
      <Row>
        <Col xs={10}>
          <InputGroup style={searchBarStyleMobile} onChange={checkSearchWord}>
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Search" />
          </InputGroup>
        </Col>
      </Row>
    );
  }
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
