import React from 'react';
import { ListGroup, Row } from 'react-bootstrap';

const SearchSuggestions = () => {
  const searchSuggestionsStyle = { position: 'absolute', top: '237px', right: '200px', width: '972px', height: '10px' };

  return (
    <Row style={searchSuggestionsStyle}>
      <ListGroup>
        <ListGroup.Item>Suggestion 1</ListGroup.Item>
        <ListGroup.Item>Suggestion 2</ListGroup.Item>
        <ListGroup.Item>Suggestion 3</ListGroup.Item>
      </ListGroup>
    </Row>
  );
};

export default SearchSuggestions;
