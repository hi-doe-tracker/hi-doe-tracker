import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row } from 'react-bootstrap';
import { useMediaQuery } from 'usehooks-ts';
import { useTracker } from 'meteor/react-meteor-data';
import { Bills } from '../../api/bill/BillCollection';

const SearchSuggestions = ({ searchWord }) => {
  const mobileView = useMediaQuery('(max-width: 800px)');
  const { ready, bills } = useTracker(() => {
    const subscription = Bills.subscribeBill();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the scraper bill data from DB.
    const billItems = Bills.find({}, { sort: { name: 1 } }).fetch();
    return {
      bills: billItems,
      ready: rdy,
    };
  }, []);
  const getSuggestions = (searchTerm) => {
    if (searchTerm === '') {
      return [];
    }
    if (ready) {
      const searchResults = [];
      const lengthOfTerm = searchTerm.length;
      for (let i = 0; i < bills.length; i++) {
        for (const property in bills[i]) {
          if (typeof bills[i][property] === 'string') {
            console.log(bills[i][property].substring(0, lengthOfTerm));
            console.log(searchTerm);
            for (let j = 0; j < bills[i][property].length; j++) {
              if (bills[i][property].substring(j, j + lengthOfTerm) === searchTerm) {
                searchResults.push(bills[i]);
              }
            }
          }
        }
      }
      return searchResults;
    }
    return [];
  };
  const searchSuggestionsStyle = { margin: 'auto', top: '100px', right: '-17px', width: '79%' };
  const searchSuggestionsStyleMobile = { margin: 'auto', top: '100px', right: '0px', width: '69%' };
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
  if (mobileView) {
    return (
      <Row>
        <ListGroup>
          {testSearchSuggestions.map((suggestion) => <ListGroup.Item key={suggestion.name} style={searchSuggestionsStyleMobile}><a href={suggestion.link} style={linkStyle}>{suggestion.name}</a></ListGroup.Item>)}
        </ListGroup>
      </Row>
    );
  }

  // Displays suggestions for search word.
  return (
    <Row>
      {getSuggestions(searchWord)}
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
