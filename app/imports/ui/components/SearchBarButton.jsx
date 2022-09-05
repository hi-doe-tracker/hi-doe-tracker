import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const SearchBarButton = ({ setStyle }) => {
  const style1 = { opacity: '1' };
  const style2 = { opacity: '0.1' };
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (click) {
      setStyle(style2);
    } else {
      setStyle(style1);
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
