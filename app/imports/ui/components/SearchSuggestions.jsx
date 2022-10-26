import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { useTracker } from 'meteor/react-meteor-data';
import { Bills } from '../../api/bill/BillCollection';

const SearchSuggestions = ({ searchWord, setClick }) => {
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

  /* Gets all bill suggestions given a search term. */
  const getSuggestions = (searchTerm) => {
    if (searchTerm === '') {
      return [];
    }
    if (ready) {
      const searchResults = [];
      const lengthOfTerm = searchTerm.length;
      // Searches through each bill.
      for (let i = 0; i < bills.length; i++) {
        // Holds all property values.
        const properties = [];
        // Searches through each property of a bill.
        Object.values(bills[i]).forEach(value => {
          // Checks if property is type string.
          if (typeof value === 'string') {
            properties.push(`${value.toLowerCase()} `);
            // Checks if the property is an array.
          } else if (Array.isArray(value)) {
            properties.push(`${value.join('').toLowerCase()} `);
          } else {
            properties.push(`${value.toString().toLowerCase()} `);
          }
        });
        // Joins all elements in the array into one string.
        const joinedElements = properties.join('').toLowerCase();

        // Loops through each character of the property.
        for (let j = 0; j < joinedElements.length; j++) {
          // Checks if the the search word matches a substring in the property.
          if (joinedElements.substring(j, j + lengthOfTerm) === searchTerm.toLowerCase()) {
            // Adds search result to list.
            searchResults.push(bills[i]);
            break;
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

  // Displays no suggestions is searchWord is nothing.
  if (searchWord === '') {
    return <div />;
  }
  if (mobileView) {
    return (
      <Row>
        <ListGroup>
          {getSuggestions(searchWord).map((suggestion) => <ListGroup.Item key={suggestion.billNo} style={searchSuggestionsStyleMobile}><a href="random" style={linkStyle}>{`${suggestion.billNo}: ${suggestion.measureTitle}`}</a></ListGroup.Item>)}
        </ListGroup>
      </Row>
    );
  }

  // hide the search bar onClick
  const clicked = () => {
    setClick(false);
  };

  // Displays suggestions for search word.
  return (
    <Row>
      <ListGroup>
        {getSuggestions(searchWord).map((suggestion) => (
          <ListGroup.Item key={suggestion.billNo} style={searchSuggestionsStyle}>
            <Link id="bill-view" onClick={clicked} to={`/viewbill/${suggestion._id}`}>{`${suggestion.billNo}: ${suggestion.measureTitle}`}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Row>
  );
};

/* Takes in a searchWord as a prop. */
SearchSuggestions.propTypes = {
  searchWord: PropTypes.string.isRequired,
  setClick: PropTypes.func.isRequired,
};

export default SearchSuggestions;
