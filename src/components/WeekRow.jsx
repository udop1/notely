import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Grid, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WeekRow = ({ startDate, handleWeek, mappedTasks }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const today = dayjs();

  const [monthName, setMonthName] = useState(printMonth(today));

  const weekDays = [...Array(7).keys()].map((day) =>
    dayjs(today.add(-dayjs().day()+1, 'day')).add(day, 'day')
  );

  const [renderDays, setRenterDays] = useState(weekDays);


  const handleWeekdayClick = (day) => {
    console.log(day.format('YYYY-MM-DD'));
    setSelectedDate(day);
    handleWeek(day);
  };

  function addWeekToArray() {
    console.log(renderDays[6]);
    const endDate = renderDays[6]; //Get the last day in current
    const newWeekDays = [...Array(7).keys()].map((day) =>
      dayjs(endDate.add(1, 'day')).add(day, 'day')
    );
    setRenterDays(newWeekDays);

    //Check to see if there are two dates
    setMonthName(printMonth(newWeekDays[0]));
  }

  function previousWeekToArray() {
    console.log(renderDays);
    const prevDate = renderDays[0]; //Get the first day in current
    const newWeekDays = [...Array(7).keys()].map((day) =>
      dayjs(prevDate.add(-7, 'day')).add(day, 'day')
    );
    setRenterDays(newWeekDays);
    
    setMonthName(printMonth(newWeekDays[0]));
  }
  function printMonth(stamp){
    var dateObject = stamp.month();
    if (dateObject === 0){return 'January'}
    if (dateObject === 1){return 'Febuary'}
    if (dateObject === 2){return 'March'}
    if (dateObject === 3){return 'April'}
    if (dateObject === 4){return 'May'}
    if (dateObject === 5){return 'June'}
    if (dateObject === 6){return 'July'}
    if (dateObject === 7){return 'August'}
    if (dateObject === 8){return 'September'}
    if (dateObject === 9){return 'October'}
    if (dateObject === 10){return 'November'}
    if (dateObject === 11){return 'December'}
  }
  return (
    
    <Container>
      <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: 'normal', color: 'grey' }}>{monthName}</Typography>
      <ArrowBackIcon onClick={previousWeekToArray}/>
    <Grid container>
      {renderDays.map((day) => {

        return (
          <Grid item key={day} xs>
            <Typography variant="subtitle1" sx={{ color: day.isSame(today, 'day') ? 'primary.main' : 'text.primary' }}>
              {day.format('ddd')}
            </Typography>
            <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'text.primary' }} onClick={() => handleWeekdayClick(day)}>
              {day.format('D')}
            </Typography>
            {mappedTasks.map((card, index) => {
              if(day.format('YYYY-MM-DD') == dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')){
                //This Date Has a Task
                return(
                  <CircleIcon key={card.id} style={{ fontSize: "8px", paddingLeft: "5px", color: "orange" }} />
                )
              }
            })}
          </Grid>
      )})}
    </Grid>
    <ArrowForwardIcon onClick={addWeekToArray}/>

    </Container>
  );
};

export default WeekRow;