import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const BuildDocument = ({ document }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d3/HSSC_Seal.png" className="logo" />
        <Text>{document.firstName}</Text>
        <Text>{document.lastName}</Text>
        <Text>{document.position}</Text>
        <Text>{document.testifying}</Text>
        <Text>{document.testifyingMethod}</Text>
      </View>
      <View style={styles.section}>
        <Text>{document.testimony}</Text>
      </View>
    </Page>
  </Document>
);

// Require a document to be passed to this component.
BuildDocument.propTypes = {
  document: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    testifying: PropTypes.string,
    organization: PropTypes.string,
    testifyingMethod: PropTypes.string,
    testimony: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default BuildDocument;
