import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import TestimonyItem from '../components/TestimonyItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const ViewTestimony = () => {
  // directly from react-to-print documentation
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // code structure taken from list stuff file
  const { ready, testimony } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    const currTestimony = Testimonies.findOne({}, {}).fetch();
    return {
      testimony: currTestimony,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <div id={PAGE_IDS.VIEW_TESTIMONY}>
      <TestimonyItem ref={componentRef} key={testimony._id} testimony={testimony} />
      <Button onClick={handlePrint}> Print or Save as PDF </Button>
      <td>
        <Link className={PAGE_IDS.VIEW_TESTIMONY_EDIT} to={`/edit/${testimony._id}`}>Edit</Link>
      </td>
    </div>
  ) : <LoadingSpinner message="Loading Testimony" />;
};

export default ViewTestimony;
