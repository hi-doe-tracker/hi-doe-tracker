import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row, Table, Accordion } from 'react-bootstrap';
import { CaretRight, CaretLeft } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

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
    tempDate.setFullYear(currentYear);
    tempDate.setMonth(currentMonth);
    tempDate.setDate(1);
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

  return (
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
              <Accordion.Item eventKey="0">
                <Accordion.Header>11:00am Hearing</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>12:00pm Hearing</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Calendar;
