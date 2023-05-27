// Month Row component (part of todos) - JACK (level 5)
// Imports
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Grid, Container } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MonthRow = ({ handleWeek, mappedTasks }) => {
  // Variables
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();
  const monthStart = today.startOf('month');
  const monthEnd = today.endOf('month');
  const days = [];
  let day = monthStart;
  while (day <= monthEnd) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const handleDateClick = (day) => {
    setSelectedDate(day);
    handleWeek(day);
  };
  const preDays = monthStart.day() - 1;
  const leakedDays = [...Array(preDays).keys()].map((day) =>
    dayjs(monthStart.add(-preDays, 'day')).add(day, 'day')
  );
  function printMonth(stamp) {
    var dateObject = stamp.month();
    if (dateObject === 0) { return 'January' }
    if (dateObject === 1) { return 'Febuary' }
    if (dateObject === 2) { return 'March' }
    if (dateObject === 3) { return 'April' }
    if (dateObject === 4) { return 'May' }
    if (dateObject === 5) { return 'June' }
    if (dateObject === 6) { return 'July' }
    if (dateObject === 7) { return 'August' }
    if (dateObject === 8) { return 'September' }
    if (dateObject === 9) { return 'October' }
    if (dateObject === 10) { return 'November' }
    if (dateObject === 11) { return 'December' }
  }

  const [monthRender, setMonthRender] = useState(days);
  const [monthPreRender, setMonthPreRender] = useState(leakedDays);
  const [monthAfterRender, setMonthAfterRender] = useState([]);
  const [monthName, setMonthName] = useState(printMonth(today));


  function addMonthToArray() {
    //Get Next Months Information
    const nextMonth = monthRender[5].add(1, 'month').startOf('month');
    const nextMonthEnd = monthRender[5].add(1, 'month').endOf('month');

    const nDays = [];
    let nDay = nextMonth;
    while (nDay <= nextMonthEnd) {
      nDays.push(nDay);
      nDay = nDay.add(1, 'day');
    }
    const nPreDays = nextMonth.day() - 1;
    if (nPreDays === -1) {
      const nLeakedDays = [...Array(6).keys()].map((day) =>
        dayjs(nextMonth.add(-6, 'day')).add(day, 'day'));

      setMonthPreRender(nLeakedDays);
    } else {
      const nLeakedDays = [...Array(nPreDays).keys()].map((day) =>
        dayjs(nextMonth.add(-nPreDays, 'day')).add(day, 'day'));
      setMonthPreRender(nLeakedDays);
    }

    const e = 6 - nextMonthEnd.day() + 1;
    if (e !== 7) {
      const nOverflowDays = [...Array(e).keys()].map((day) =>
        dayjs(nextMonthEnd.add(1, 'day')).add(day, 'day')
      );
      setMonthAfterRender(nOverflowDays);
    } else {

      setMonthAfterRender([]);
    }
    setMonthName(printMonth(nextMonth));
    setMonthRender(nDays);
  }

  function preMonthToArray() {
    //Get Next Months Information
    const nextMonth = monthRender[5].add(-1, 'month').startOf('month');
    const nextMonthEnd = monthRender[5].add(-1, 'month').endOf('month');

    const nDays = [];
    let nDay = nextMonth;
    while (nDay <= nextMonthEnd) {
      nDays.push(nDay);
      nDay = nDay.add(1, 'day');
    }
    const nPreDays = nextMonth.day() - 1;
    if (nPreDays === -1) {
      const nLeakedDays = [...Array(6).keys()].map((day) =>
        dayjs(nextMonth.add(-6, 'day')).add(day, 'day')
      );

      setMonthPreRender(nLeakedDays);
    } else {
      const nLeakedDays = [...Array(nPreDays).keys()].map((day) =>
        dayjs(nextMonth.add(-nPreDays, 'day')).add(day, 'day')
      );


      setMonthPreRender(nLeakedDays);
    }

    const e = 6 - nextMonthEnd.day() + 1;
    if (e !== 7) {
      const nOverflowDays = [...Array(e).keys()].map((day) =>
        dayjs(nextMonthEnd.add(1, 'day')).add(day, 'day')
      );
      setMonthAfterRender(nOverflowDays);
    } else {

      setMonthAfterRender([]);
    }

    setMonthName(printMonth(nextMonth));
    setMonthRender(nDays);
  }


  return (
    <Container>
      <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: 'normal', color: 'grey' }}>{monthName}</Typography>
      <ArrowBackIcon onClick={preMonthToArray} />
      <ArrowForwardIcon onClick={addMonthToArray} />
      <Grid container spacing={2} columns={7}>
        <Grid item xs={1} ><Typography>Mon</Typography></Grid>
        <Grid item xs={1} ><Typography>Tue</Typography></Grid>
        <Grid item xs={1} ><Typography>Wed</Typography></Grid>
        <Grid item xs={1} ><Typography>Thu</Typography></Grid>
        <Grid item xs={1} ><Typography>Fri</Typography></Grid>
        <Grid item xs={1} ><Typography>Sat</Typography></Grid>
        <Grid item xs={1} ><Typography>Sun</Typography></Grid>
        {monthPreRender.map((day) => (
          <Grid item key={day} xs={1} >
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'grey' }} onClick={() => handleDateClick(day)}>
              {day.format('D')}
            </Typography>
          </Grid>
        ))}
        {monthRender.map((day) => (
          <Grid item key={day} xs={1} >
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'text.primary' }} onClick={() => handleDateClick(day)}>
              {day.format('D')}
            </Typography>
            {mappedTasks.map((card, index) => {

              if (card.id === "tags") { return null };
              if (day.format('YYYY-MM-DD') === dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')) {
                //This Date Has a Task
                return (
                  <CircleIcon key={card.id} style={{ fontSize: "8px", paddingLeft: "5px", color: "orange" }} />
                )
              } else return null
            })}
          </Grid>
        ))}
        {monthAfterRender.map((day) => (
          <Grid item key={day} xs={1} >
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'grey' }} onClick={() => handleDateClick(day)}>
              {day.format('D')}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MonthRow;
