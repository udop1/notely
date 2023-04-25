import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography, Checkbox, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material";
import NavBar from "./NavBar";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { UserAuth } from "../context/AuthContext";
import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Timestamp, fromDate } from 'firebase/firestore';
import WeekRow from "./WeekRow";
import MonthRow from "./MonthRow";

const Todos = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(dayjs());
    const [showSubField, setShowSubField] = useState(false);
    const [open, setOpen] = useState(false);
    const { todos, createToDo, updateToDoSubTask } = UserAuth();
    //const { todosRender, setTodoRender } = useState([]);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-UK', options);
    const split = today.split(" ");
    // Date info
    const stringify = split[0] + " " + split[1] + ", " + split[2];

    //Render Todo

    //Get Date
    const nowD = dayjs(); //Get todays Date


    function dayToString(no) {
        if (no === 0) { return "Sunday" } else if (no === 1) { return "Monday" } else if (no === 2) { return "Tuesday" } else if (no === 3) { return "Wednesday" } else if (no === 4) { return "Thursday" } else if (no === 5) { return "Friday" } else if (no === 6) { return "Saturday" }
    }
    function fixMins(no) {
        if (no > 9) {
            return no;
        } else {
            var str = "0" + no;
            return str;
        }
    }
    function handleData(timestamp) {
        var str = timestamp.toDate();

        //const dayNum = str.getDate(); //Makes it read the day, 1st, 2nd - 31st
        //const dayStr = dayToString(str.getDay()); //Makes it ready monday, tuesday etc

        //Get the time
        const hours = str.getHours();
        const mins = fixMins(str.getMinutes());
        return hours + ":" + mins;
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (newDate) => {
        const today = dayjs();
        const selectedDate = dayjs(newDate);

        if (selectedDate.isBefore(today, 'day')) {
            console.log('Selected date is in the past');
        } else {
            setDate(selectedDate);
        }
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subTasks, setSubTasks] = useState([{ id: 0, task: '', completed: false }]);

    const handleAddSubTask = () => {
        const newId = subTasks.length;
        setSubTasks([...subTasks, { id: newId, task: '', completed: false }]);
    };

    const handleSubTaskChange = (id, e) => {
        const updatedSubTasks = subTasks.map((subTask) => {
            if (subTask.id === id) {
                return { ...subTask, task: e.target.value };
            } else {
                return subTask;
            }
        });
        setSubTasks(updatedSubTasks);
    };
    const handleRemoveSubTask = () => {
        if (subTasks.length > 1) {
            const updatedSubTasks = [...subTasks];
            updatedSubTasks.pop();
            setSubTasks(updatedSubTasks);
        }
    };
    const handleAddTodo = async () => {
        const newTodo = {
            title: title,
            content: description,
            createdDate: Timestamp.now(),
            modifiedDate: Timestamp.now(),
            revisionNumber: 0,
            taskDate: correctDate(date.toISOString()),
            tasks: subTasks.map(subTask => subTask),
            tags: []
        };
        var docId = await createToDo(newTodo);
        //navigate(`/todo/${docId}`);
        handleClose();
    };


    //DATA VALIDATION
    function correctDate(str) {
        const dateformat = new Date(str);
        const ts = Timestamp.fromDate(dateformat);
        return ts;
    }


    const onCheckChanged = async (id, task, index, check) => {
        console.log(id);
        if (check) {
            task[index].completed = true;
        }
        else {
            task[index].completed = false;
        }
        const newResult = {
            tasks: task.map(subTask => subTask),
        }
        var docId = await updateToDoSubTask(id, newResult);
    }
    function handleCheckboxChange(id, task, index, e) {
        const isChecked = e.target.checked;
        onCheckChanged(id, task, index, isChecked);
    }
    
    function handleTaskCheckboxChange(id, e) {
        const isChecked = e.target.checked;
        completeTask(id, {completed: isChecked});
    }
    const completeTask = async (id, task) => {var docId = await updateToDoSubTask(id, task);}

    const [showToday, setShowToday] = useState(true);
    const [showWeek, setShowWeek] = useState(false);
    const [showMonth, setShowMonth] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [menuView, setMenuView] = useState(true);
    const [preDate, setPreDate] = useState("");

    function handleToday(){
        setShowToday(true);
        setShowWeek(false);
        setShowMonth(false);
        setSelectedDate(dayjs().format('YYYY-MM-DD'));
    }
    function handleWeek(){
        setShowToday(false);
        setShowWeek(true);
        setShowMonth(false);
    }
    function handleMonth(){
        setShowToday(false);
        setShowWeek(false);
        setShowMonth(true);
    }
    const handleWeekClick = (day) => {
        setSelectedDate(day.format('YYYY-MM-DD'));
        setMenuView(false);
    };

    function todaysBtn(){
        handleWeekClick(dayjs());
    }
    function handleUpcomming(){
        setSelectedDate("Upcomming");
        setMenuView(false);
    }
    function handleTags(){

    }
    function handleUpcommingDate(stamp){
        var str = stamp.toDate();

        const dayNum = str.getDate(); //Makes it read the day, 1st, 2nd - 31st
        const dayStr = dayToString(str.getDay()); //Makes it ready monday, tuesday etc

        //Get the time
        const hours = str.getHours();
        const mins = fixMins(str.getMinutes());

        const read = dayStr + " " + dayNum + " ";//Wednesday 2 March Example
        return read;
    }
    var previousDate = "";
    //<!-- component={Link} to={`/todos/${card.id}`}-->

    var noOfCards = 0;
    return (
        <Box>
            <NavBar />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a New ToDo Item</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Task Description (Optional)"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />



                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Basic date time picker" value={date} onChange={e => handleDateChange(e.$d)} />
                    </LocalizationProvider>


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowSubField(!showSubField)}
                    >
                        {showSubField ? 'Hide' : 'Show'} Sub Tasks
                    </Button>
                    {showSubField &&
                        subTasks.map((subTask) => (
                            <TextField
                                key={subTask.id}
                                label="Add a Subtask"
                                fullWidth
                                value={subTask.title}
                                margin="normal"
                                onChange={(e) => handleSubTaskChange(subTask.id, e)}
                                style={{ display: showSubField ? 'block' : 'none' }}
                            />
                        ))}
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={{ display: showSubField ? 'block' : 'none' }}
                        onClick={handleAddSubTask}
                    >
                        Add Another Sub Task
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={{ display: showSubField ? 'block' : 'none' }}
                        onClick={handleRemoveSubTask}
                    >
                        Remove Last Sub Task
                    </Button>
                    <Button>Tags</Button>
                    <Button>Reminders</Button>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddTodo}>OK</Button>
                </DialogActions>
            </Dialog>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<NoteAddOutlinedIcon />} tooltipTitle="New ToDo" sx={{ color: "black" }} onClick={handleOpen} />
            </SpeedDial>

            <Container>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleToday}>Today</Button>
                    <Button onClick={handleWeek}>Week</Button>
                    <Button onClick={handleMonth}>Month</Button>
                </div>
                {showWeek && (<WeekRow handleWeek={handleWeekClick} mappedTasks={todos} />)}
                {showMonth && (<MonthRow handleWeek={handleWeekClick}  mappedTasks={todos}/>)}
                <Typography>Today</Typography>
                <Typography>{stringify}</Typography>

            </Container>

            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<ListRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>To-DO</Typography></Button>
                    </Grid>
                </Grid>
            </Container>

            <Container>

                {/* First Offer the user the option of 3 Buttons. Todays Tasks, Upcomming and Tags */}
                {menuView && 
                    <Container>
                        <Button onClick={handleToday}>Todays Tasks</Button>
                        <Button onClick={handleUpcomming}>Upcomming Tasks</Button>
                        <Button>Tags</Button>
                    </Container>
                }
                {todos.map((card, index) => {
                    if(menuView){return};
                    //console.log(selectedDate + " vs " + dayjs(card.taskDate.toDate()).format('YYYY-MM-DD'));
                    if(selectedDate == "Upcomming"){
                        //Shows the next 5 tasks
                        noOfCards += 1;
                        //Cluster Them TO DATE
                        if(previousDate != dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')){
                            previousDate = dayjs(card.taskDate.toDate()).format('YYYY-MM-DD');
                            return(
                                <Card key={card.id}>
                                    <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleUpcommingDate(card.taskDate)}</Typography>

                                    <CardActionArea>
                                        <CardContent>
                                            <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)}/>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                            {
                                            dayjs() > dayjs(card.taskDate.toDate()) ? 
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>OVERDUE</Typography> : null
                                            }
                                            <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleData(card.taskDate)}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{card.content}</Typography>
                                            {card.tasks.map((task, index) => {
                                                return (
                                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                                        {task.completed ? (
                                                            <Checkbox
                                                                checked
                                                                onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                                onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                            />
                                                        )}
                                                        <div style={{ marginLeft: 8 }}>{task.task}</div>
                                                    </div>
                                                )
                                            })
                                            }
                                            {/* <Typography variant="body" dangerouslySetInnerHTML={{ __html: note.content }}></Typography> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        } else {
                            previousDate = dayjs(card.taskDate.toDate()).format('YYYY-MM-DD');
                            return(
                                <Card key={card.id}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)}/>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleData(card.taskDate)}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{card.content}</Typography>
                                            {card.tasks.map((task, index) => {
                                                return (
                                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                                        {task.completed ? (
                                                            <Checkbox
                                                                checked
                                                                onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                            />
                                                        ) : (
                                                            <Checkbox
                                                                onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                            />
                                                        )}
                                                        <div style={{ marginLeft: 8 }}>{task.task}</div>
                                                    </div>
                                                )
                                            })
                                            }
                                            {/* <Typography variant="body" dangerouslySetInnerHTML={{ __html: note.content }}></Typography> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        }
                        //Update this date as the last date
                    } else if(selectedDate == dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')){
                        noOfCards += 1;
                        return (
                            <Card key={card.id}>
                                <CardActionArea>
                                    <CardContent>
                                        <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)}/>
                                        <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleData(card.taskDate)}</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{card.content}</Typography>
                                        {card.tasks.map((task, index) => {
                                            return (
                                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                                    {task.completed ? (
                                                        <Checkbox
                                                            checked
                                                            onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                        />
                                                    ) : (
                                                        <Checkbox
                                                            onChange={(e) => handleCheckboxChange(card.id, card.tasks, index, e)}
                                                        />
                                                    )}
                                                    <div style={{ marginLeft: 8 }}>{task.task}</div>
                                                </div>
                                            )
                                        })
                                        }
                                        {/* <Typography variant="body" dangerouslySetInnerHTML={{ __html: note.content }}></Typography> */}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    }

                    //Check if it is the last one
                    if(index == todos.length-1){
                        //Last one in the MAP
                        if(noOfCards == 0){
                            return (
                                <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>No Tasks Today</Typography>
                            );
                        } else {
                            noOfCards = 0;
                        }
                    }
                }
                
                )}
            </Container>
        </Box>
    );
};

export default Todos;