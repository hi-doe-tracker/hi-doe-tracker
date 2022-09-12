import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row } from 'react-bootstrap';
// import { useMediaQuery } from 'usehooks-ts';

const SearchSuggestions = ({ searchWord }) => {
  // const mobileView = useMediaQuery('(max-width: 760px)');
  const searchSuggestionsStyle = { margin: 'auto', top: '100px', right: '-17px', width: '79%' };
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
    <Row>
      <ListGroup>
        {testSearchSuggestions.map((suggestion) => <ListGroup.Item key={suggestion.name} style={searchSuggestionsStyle}><a href={suggestion.link} style={linkStyle}>{suggestion.name}</a></ListGroup.Item>)}
      </ListGroup>
    </Row>
  );
};

/* Takes in a searchWord as a prop. */
SearchSuggestions.propTypes = {
  searchWord: PropTypes.string.isRequired,
};

export default SearchSuggestions;
