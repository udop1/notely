import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Grid } from '@mui/material';

const WeekRow = ({ startDate, handleWeek }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();
  const weekDays = [...Array(7).keys()].map((day) =>
    dayjs(startDate).add(day, 'day')
  );

  const handleWeekdayClick = (day) => {
    console.log(day.format('YYYY-MM-DD'));
    setSelectedDate(day);
    handleWeek(day);
  };

  return (
    <Grid container>
      {weekDays.map((day) => (
        <Grid item key={day} xs>
          <Typography variant="subtitle1" sx={{ color: day.isSame(today, 'day') ? 'primary.main' : 'text.primary' }}>
            {day.format('ddd')}
          </Typography>
          <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'text.primary' }} onClick={() => handleWeekdayClick(day)}>
            {day.format('D')}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeekRow;