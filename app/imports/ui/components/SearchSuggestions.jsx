import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row } from 'react-bootstrap';

const SearchSuggestions = ({ searchWord }) => {
  const searchSuggestionsStyle = { position: 'absolute', top: '237px', right: '200px', width: '972px', height: '10px' };
  const linkStyle = { color: 'black', textDecoration: 'none' };
  const testSearchSuggestions = [
    {
      name: `Suggestion 1 for ${searchWord}`,
      link: 'Suggestion 1 Link',
    },
    {
      name: `Suggestion 2 for ${searchWord}`,
      link: 'Suggestion 2 Link',
    },
    {
      name: `Suggestion 3 for ${searchWord}`,
      link: 'Suggestion 3 Link',
    },
  ];

  // Displays no suggestions is searchWord is nothing.
  if (searchWord === '') {
    return <div />;
  }

  // Displays suggestions for search word.
  return (
    <Row style={searchSuggestionsStyle}>
      <ListGroup>
        {testSearchSuggestions.map((suggestion) => <ListGroup.Item key={suggestion.name}><a href={suggestion.link} style={linkStyle}>{suggestion.name}</a></ListGroup.Item>)}
      </ListGroup>
    </Row>
  );
};

/* Takes in a searchWord as a prop. */
SearchSuggestions.propTypes = {
  searchWord: PropTypes.string.isRequired,
};

export default SearchSuggestions;
