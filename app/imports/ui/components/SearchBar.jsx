import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchBar = ({ setStyle }) => {
  const style1 = { opacity: '1' };
  const style2 = { opacity: '0.2' };
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (click) {
      setStyle(style2);
    } else {
      setStyle(style1);
    }
  });

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
    </Container>
  );
};

SearchBar.propTypes = {
  setStyle: PropTypes.func.isRequired,
};

export default SearchBar;
