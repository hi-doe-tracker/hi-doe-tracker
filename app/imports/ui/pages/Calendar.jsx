import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Card, Col, Container, Row, Table, Accordion, ListGroup } from 'react-bootstrap';
import { CaretRight, CaretLeft } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Hearings } from '../../api/hearing/HearingCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const today = new Date();

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const { ready, hearings } = useTracker(() => {
    const hearingsSubscription = Hearings.subscribeHearings();
    // Determine if the subscription is ready
    const rdy = hearingsSubscription.ready();
    // Get the hearing data
    const hearingItems = Hearings.find({}, { sort: { datetime: -1 } }).fetch();
    return {
      ready: rdy,
      hearings: hearingItems,
    };
  }, []);

  const isEventArray = new Array(32).fill(false);

  const updateIsEventArray = () => {
    let testDate;
    isEventArray.fill(false);
    for (let i = 0; i < hearings.length; i++) {
      testDate = new Date(hearings[i].datetime);
      if (testDate.getMonth() === currentMonth && testDate.getFullYear() === currentYear) {
        isEventArray[testDate.getDate()] = true;
      }
    }
  };

  const selectDay = (day, month) => {
    if (month === currentMonth) {
      setCurrentDay(day);
    }
  };

  const nextMonth = () => {
    if (currentMonth >= 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setCurrentDay(0);
  };

  const prevMonth = () => {
    if (currentMonth <= 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setCurrentDay(0);
  };

  const getWeekday = (day, month, year) => {
    const tempDate = new Date(year, month, day);
    return tempDate.getDay();
  };

  const getCardStyle = (day, month, year) => {
    let style = null;
    let bg = null;
    let text = null;
    let border = null;

    if (isEventArray[day]) {
      bg = 'warning';
    }

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      bg = 'primary';
      text = 'white';
    }
    if (month !== currentMonth) {
      style = { opacity: '.5' };
    }
    if (day === currentDay && month === currentMonth) {
      border = 'info';
    }

    return {
      style: style,
      bg: bg,
      text: text,
      border: border,
    };
  };

  const getDays = () => {
    const tempDate = new Date();
    const content = [];
    let week = [];
    let dayProps;
    updateIsEventArray();
    tempDate.setDate(1);
    tempDate.setMonth(currentMonth);
    tempDate.setFullYear(currentYear);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay());
    do {
      for (let i = 0; i < 7; i++) {
        const date = tempDate.getDate();
        const month = tempDate.getMonth();
        dayProps = getCardStyle(tempDate.getDate(), tempDate.getMonth(), tempDate.getFullYear());
        week.push(
          <td>
            <Card
              bg={dayProps.bg}
              style={dayProps.style}
              text={dayProps.text}
              border={dayProps.border}
              onClick={() => selectDay(date, month)}
            >
              <Card.Header>
                {tempDate.getDate()}
              </Card.Header>
              <Card.Body />
            </Card>
          </td>,
        );
        tempDate.setDate(tempDate.getDate() + 1);
      }
      content.push(<tr>{week}</tr>);
      week = [];
    } while (currentMonth === tempDate.getMonth());
    return content;
  };

  const getHearingsByNotice = (notice) => {
    const content = [];
    for (let i = 0; i < hearings.length; i++) {
      if (hearings[i].notice === notice) {
        content.push(
          <Accordion.Item eventKey="0">
            <Accordion.Header>{hearings[i].measureType}-{hearings[i].measureNumber}</Accordion.Header>
            <Accordion.Body>
              {hearings[i].description}
            </Accordion.Body>
          </Accordion.Item>,
        );
      }
    }
    return content;
  };

  const getHearings = () => {
    const content = [];
    let testDate;
    const filterHearings = hearings.filter((value, index, self) => (self.findIndex(v => v.notice === value.notice) === index));
    for (let i = 0; i < filterHearings.length; i++) {
      testDate = new Date(filterHearings[i].datetime);
      if (
        testDate.getFullYear() === currentYear &&
        testDate.getMonth() === currentMonth &&
        testDate.getDate() === currentDay
      ) {
        content.push(
          <Accordion.Item eventKey="0">
            <Accordion.Header>{filterHearings[i].notice}</Accordion.Header>
            <Accordion.Body>
              <h5>{filterHearings[i].datetime}</h5>
              <Accordion>
                {getHearingsByNotice(filterHearings[i].notice)}
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>,
        );
      }
    }
    if (content.length <= 0) {
      return 'No Scheduled Hearings';
    }
    return content;
  };

  return ready ? (
    <Container id={PAGE_IDS.CALENDAR}>
      <Row>
        <Col sm={9}>
          <Row>
            <Col>
              <h1>{months[currentMonth]} {currentYear}</h1>
            </Col>
            <Col className="d-grid gap-2">
              <ButtonGroup>
                <Button variant="light" onClick={prevMonth}>
                  <CaretLeft size={20} /> Prev Month
                </Button>
                <Button variant="light" onClick={nextMonth}>
                  Next Month <CaretRight size={20} />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive borderless>
                <thead>
                  <tr>
                    {days.map((dayName) => <th><div style={{ width: '20px' }}>{dayName}</div></th>)}
                  </tr>
                </thead>
                <tbody>
                  {getDays()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              {currentDay === 0 ? 'No Date Selected' : `${days[getWeekday(currentDay, currentMonth, currentYear)]}, ${months[currentMonth]} ${currentDay}, ${currentYear}`}
            </Card.Header>
            <Accordion>
              {getHearings()}
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading" />;
};

export default Calendar;
