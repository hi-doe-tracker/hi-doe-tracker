import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const NotificationIcon = () => {
  return (
   <>
        <Button variant="secondary">Secondary</Button>{' '}
   </>
  );
};

export default NotificationIcon;