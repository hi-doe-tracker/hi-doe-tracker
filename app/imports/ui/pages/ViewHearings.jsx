import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import HearingCard from '../components/HearingCard';
import { Hearings } from '../../api/hearing/HearingCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
/* Renders a Card group containing all of the Hearing documents. Use <ViewHearings> to render each card. */
const ViewHearings = () => {
  const { noticeParam } = useParams();
  const { ready, hearings } = useTracker(() => {
    const hearingsSubscription = Hearings.subscribeHearings();
    const rdy = hearingsSubscription.ready();
    const hearingItems = Hearings.find({}).fetch();
    return {
      hearings: hearingItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.VIEW_HEARINGS} className="py-3">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Hearings</h2>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {hearings.filter((value, index, self) => (self.findIndex(v => v.notice === value.notice) === index)).map((hearing) => (<HearingCard key={hearing._id} hearing={hearing} showInitial={noticeParam === hearing.notice} />))}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Hearings" />);
};

export default ViewHearings;
