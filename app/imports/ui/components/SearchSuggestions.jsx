import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row } from 'react-bootstrap';

const SearchSuggestions = ({ searchWord }) => {
  const searchSuggestionsStyle = { position: 'absolute', top: '237px', right: '200px', width: '972px', height: '10px' };

  // Displays no suggestions is searchWord is nothing.
  if (searchWord === '') {
    return <div />;
  }

  // Displays suggestions for search word.
  return (
    <Row style={searchSuggestionsStyle}>
      <ListGroup>
        <ListGroup.Item>{`Suggestion for ${searchWord}`}</ListGroup.Item>
        <ListGroup.Item>{`Suggestion for ${searchWord}`}</ListGroup.Item>
        <ListGroup.Item>{`Suggestion for ${searchWord}`}</ListGroup.Item>
      </ListGroup>
    </Row>
  );
};

/* Takes in a searchWord as a prop. */
SearchSuggestions.propTypes = {
  searchWord: PropTypes.string.isRequired,
};

export default SearchSuggestions;
