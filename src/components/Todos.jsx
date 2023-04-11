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

const Todos = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(dayjs());
    const [showSubField, setShowSubField] = useState(false);
    const [open, setOpen] = useState(false);
    const { todos, createToDo, updateToDoSubTask } = UserAuth();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-UK', options);
    const split = today.split(" ");
    // Date info
    const stringify = split[0] + " " + split[1] + ", " + split[2];

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
    //<!-- component={Link} to={`/todos/${card.id}`}-->
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
                    <Button>Today</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                </div>
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
                {todos.map((card) => {
                    return (
                        <Card key={card.id}>
                            <CardActionArea>
                                <CardContent>
                                    <Checkbox />
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

                })}
            </Container>
        </Box>
    );
};

export default Todos;