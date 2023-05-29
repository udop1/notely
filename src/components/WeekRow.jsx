// Week Row component (part of todos) - JACK (level 5)
// Imports
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Grid, Container, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WeekRow = ({ startDate, handleWeek, mappedTasks }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const today = dayjs();

  const [monthName, setMonthName] = useState(printMonth(today));

  const weekDays = [...Array(7).keys()].map((day) =>
    dayjs(today.add(-dayjs().day() + 1, 'day')).add(day, 'day')
  );

  const [renderDays, setRenterDays] = useState(weekDays);


  const handleWeekdayClick = (day) => {
    setSelectedDate(day);
    handleWeek(day);
  };

  function addWeekToArray() {
    const endDate = renderDays[6]; //Get the last day in current
    const newWeekDays = [...Array(7).keys()].map((day) =>
      dayjs(endDate.add(1, 'day')).add(day, 'day')
    );
    setRenterDays(newWeekDays);

    //Check to see if there are two dates
    setMonthName(printMonth(newWeekDays[0]));
  }

  function previousWeekToArray() {
    const prevDate = renderDays[0]; //Get the first day in current
    const newWeekDays = [...Array(7).keys()].map((day) =>
      dayjs(prevDate.add(-7, 'day')).add(day, 'day')
    );
    setRenterDays(newWeekDays);

    setMonthName(printMonth(newWeekDays[0]));
  }
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
  return (

    <Container>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 700 }}>{monthName}</Typography>
        <ArrowBackIcon onClick={previousWeekToArray} />
        <ArrowForwardIcon onClick={addWeekToArray} />
      </Stack>
      <Grid container sx={{ textAlign: "center" }}>
        {renderDays.map((day) => {
          return (
            <Grid item key={day} xs>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: day.isSame(today, 'day') ? 'var(--green-400)' : 'text.primary' }}>
                {day.format('ddd')}
              </Typography>
              <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'var(--green-400)' : 'text.primary' }} onClick={() => handleWeekdayClick(day)}>
                {day.format('D')}
              </Typography>

              {/* {mappedTasks.map((card, index) => {
                if (card.id === "tags") { return null };
                if (day.format('YYYY-MM-DD') === dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')) {
                  //This Date Has a Task
                  return (
                    <CircleIcon key={card.id} style={{ fontSize: "8px", paddingLeft: "5px", color: "orange" }} />
                  )
                } else return null
              })} */}
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
};

export default WeekRow;