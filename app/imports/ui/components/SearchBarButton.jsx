import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const SearchBarButton = ({ setStyle }) => {
  // Holds CSS for normal state and search state.
  const normalStyle = { opacity: '1' };
  const searchStyle = { opacity: '0.1', pointerEvents: 'none' };
  // Holds the state of a button click.
  const [click, setClick] = useState(false);

  // Updates CSS in App.jsx whenever click is changed by calling setStyle with different styles.
  useEffect(() => {
    if (click) {
      setStyle(searchStyle);
    } else {
      setStyle(normalStyle);
    }
  }, [click]);

  return (
    <Container>
      <Row>
        <Col xs={11} />
        <Col>
          <Button variant="outline-dark" onClick={() => setClick(!click)}>
            <BsSearch />
          </Button>
        </Col>
      </Row>
      {click ? <SearchBar /> : <div />}
    </Container>
  );
};

SearchBarButton.propTypes = {
  setStyle: PropTypes.func.isRequired,
};

export default SearchBarButton;
