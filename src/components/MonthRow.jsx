import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Grid } from '@mui/material';

const MonthRow = ({handleWeek}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();
  const daysInMonth = today.daysInMonth();
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

  return (
    <Grid container  spacing={2} columns={7}>
      {days.map((day) => (
        <Grid item key={day} xs={1} >
          <Typography variant="subtitle1" sx={{ color: day.isSame(today, 'day') ? 'primary.main' : 'text.primary' }}>
            {day.format('ddd')}
          </Typography>
          <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: selectedDate?.isSame(day, 'day') ? 'bold' : 'normal', color: selectedDate?.isSame(day, 'day') ? 'secondary.main' : 'text.primary' }} onClick={() => handleDateClick(day)}>
            {day.format('D')}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthRow;
