import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography, Checkbox, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Stack } from "@mui/material";
import NavBar from "./NavBar";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { UserAuth } from "../context/AuthContext";
import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import WeekRow from "./WeekRow";
import MonthRow from "./MonthRow";
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Todos = () => {
    const [date, setDate] = useState(dayjs());
    const [showSubField, setShowSubField] = useState(false);
    const [showTagField, setTagField] = useState(false);
    const [open, setOpen] = useState(false);
    const { todos, createToDo, updateToDoSubTask, setToDoTags } = UserAuth();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-UK', options);
    const split = today.split(" ");
    // Date info
    const setaStringify = split[0] + " " + split[1] + ", " + split[2];

    const [stringify, setStringify] = useState(setaStringify);
    const [isToday, setIsToday] = useState(true);
    //Render Todo

    //Get Date
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

    const [dateError, setDateError] = useState(null);
    const handleDateChange = (newDate) => {
        const today = dayjs();
        const selectedDate = dayjs(newDate);

        if (selectedDate.isBefore(today, 'day')) {
            setDateError('Selected date is in the past');
        } else {
            setDate(selectedDate);
            setDateError(null);
        }
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subTasks, setSubTasks] = useState([]); //{ id: 0, task: '', completed: false }

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
        } else {
            const updatedSubTasks = [...subTasks];
            updatedSubTasks.pop();
            setSubTasks(updatedSubTasks);
            setShowSubField(!showSubField);
        }
    };

    const [titleError, setTitleError] = useState('');
    const handleAddTodo = async () => {
        if (title.length < 3) {
            setTitleError('Task title must have at least 3 characters.');
            return;
        }

        if (dateError != null) {
            console.log("'Selected date is in the past'")
        }
        // clear the error message if there are no validation errors
        setTitleError('');

        var newTodo = {};
        if (subTasks.length > 0) {
            newTodo = {
                title: title,
                content: description,
                createdDate: Timestamp.now(),
                modifiedDate: Timestamp.now(),
                revisionNumber: 0,
                taskDate: correctDate(date.toISOString()),
                tasks: subTasks.map(subTask => subTask),
                tags: selectedTags
            };
        } else {
            newTodo = {
                title: title,
                content: description,
                createdDate: Timestamp.now(),
                modifiedDate: Timestamp.now(),
                revisionNumber: 0,
                taskDate: correctDate(date.toISOString()),
                tags: selectedTags
            };
        }

        await createToDo(newTodo);
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

        if (check) {
            task[index].completed = true;
        }
        else {
            task[index].completed = false;
        }
        const newResult = {
            tasks: task.map(subTask => subTask),
        }
        await updateToDoSubTask(id, newResult);
    }
    function handleCheckboxChange(id, task, index, e) {
        const isChecked = e.target.checked;
        onCheckChanged(id, task, index, isChecked);
    }

    function handleTaskCheckboxChange(id, e) {
        const isChecked = e.target.checked;
        completeTask(id, { completed: isChecked });
    }
    const completeTask = async (id, task) => { await updateToDoSubTask(id, task); }
    const addTag = async (id, task) => { await setToDoTags(id, task); }

    const [showWeek, setShowWeek] = useState(false);
    const [showMonth, setShowMonth] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    // const [menuView, setMenuView] = useState(true);
    // const [tagView, setTagView] = useState(false);

    function handleToday() {
        setShowWeek(false);
        setShowMonth(false);
        handleWeekClick(dayjs());
        setIsToday(true);
    }
    function handleWeek() {
        setShowWeek(true);
        setShowMonth(false);
    }
    function handleMonth() {
        setShowWeek(false);
        setShowMonth(true);
    }
    const handleWeekClick = (day) => {
        setSelectedDate(day.format('YYYY-MM-DD'));
        // setMenuView(false);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const thiday = new Date(day).toLocaleDateString('en-UK', options);
        const split = thiday.split(" ");
        const readableDate = split[0] + " " + split[1] + ", " + split[2];
        setStringify(readableDate);
        setIsToday(false);

        //Check to see if it is today
        if (day.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
            setIsToday(true);
        }
    };

    // function handleUpcomming() {
    //     setSelectedDate("Upcomming");
    //     setMenuView(false);
    // }
    // function handleTags() {
    //     setTagView(true);
    //     setMenuView(false);
    // }
    function handleUpcommingDate(stamp) {
        var str = stamp.toDate();

        const dayNum = str.getDate(); //Makes it read the day, 1st, 2nd - 31st
        const dayStr = dayToString(str.getDay()); //Makes it ready monday, tuesday etc

        //Get the time
        const read = dayStr + " " + dayNum + " ";//Wednesday 2 March Example
        return read;
    }
    var previousDate = "";
    var noOfCards = 0;

    // TAGS
    const [newTag, setNewTag] = useState('');
    const [tagSavedList, settagSavedList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const selectTag = (tag) => {

        console.log(tag);
        let arr = selectedTags;
        arr.push(tag);
        console.log(arr);
        setSelectedTags(arr);
    }

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const addNewTag = () => {
        const arr = tagSavedList;
        arr.push(newTag);
        settagSavedList(arr);
        addTag("tags", arr);
        setNewTag('');
    };

    // const removeTag = (index) => {
    //     const arr = tagSavedList;
    //     arr.splice(index, 1);
    //     settagSavedList(arr);
    //     addTag("tags", arr);
    // };
    //Check to see if these tags already exist
    useEffect(() => {
        todos.forEach(card => {
            if (card.id === 'tags') {
                settagSavedList(card.saved);
            }
        });
    }, [todos]);

    return (
        <Box>
            <NavBar />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ pb: 0 }}>Add a New To-do Item</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task Title"
                        variant="standard"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        error={!!titleError}
                        helperText={titleError}
                    />
                    <TextField
                        label="Task Description (Optional)"
                        variant="standard"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Basic date time picker"
                            value={date}
                            onChange={e => handleDateChange(e.$d)}
                            sx={{ my: 4 }}
                        />
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
                                variant="standard"
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
                    <Button
                        onClick={() => setTagField(!showTagField)}
                    >Tags</Button>
                    {showTagField &&
                        <Container>
                            {tagSavedList.length > 0 ? (
                                <div>
                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>Saved Tags</Typography>
                                    {tagSavedList.map((tag, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                onClick={() => selectTag(tag)}
                                            >
                                                {tag}
                                            </Button>
                                        )
                                    })}
                                </div>
                            ) : <Typography key={tagSavedList.length}>No Saved Tags</Typography>}
                            <Typography>Add New Tags</Typography>
                            <TextField
                                key={tagSavedList.length + 1}
                                label="Add a Tag"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                value={newTag}
                                onChange={handleNewTagChange}
                            />
                            <Button onClick={addNewTag}>Add new tag</Button>
                        </Container>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddTodo}>OK</Button>
                </DialogActions>
            </Dialog>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<NoteAddOutlinedIcon />} tooltipTitle="New ToDo" sx={{ color: "black" }} onClick={handleOpen} />
            </SpeedDial>

            {/* isToday doesnt detect the button, but if the selected date is today */}
            <Container sx={{ backgroundColor: isToday ? "#FFFFFF" : "transparent", mt: -3, py: 2 }}>
                <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="outlined" onClick={handleToday} sx={{ borderRadius: 2, px: "0" }}>Today</Button>
                    <Button variant="outlined" onClick={handleWeek} sx={{ borderRadius: 2, px: "0" }}>Week</Button>
                    <Button variant="outlined" onClick={handleMonth} sx={{ borderRadius: 2, px: "0" }}>Month</Button>
                </Stack>
                {showWeek && (<WeekRow handleWeek={handleWeekClick} mappedTasks={todos} />)}
                {showMonth && (<MonthRow handleWeek={handleWeekClick} mappedTasks={todos} />)}

            </Container>

            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<ListRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>{stringify}</Typography></Button>
                    </Grid>
                </Grid>
            </Container>

            <Container>

                {/* First Offer the user the option of 3 Buttons. Todays Tasks, Upcomming and Tags */}
                {/* {menuView &&
                    <Container>
                        <Button onClick={handleToday}>Todays Tasks</Button>
                        <Button onClick={handleUpcomming}>Upcoming Tasks</Button>
                        <Button onClick={handleTags}>Tags</Button>
                    </Container>
                } */}


                {/* {tagView &&
                    <Container>
                        {tagSavedList.length > 0 ? (
                            <div>
                                <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>Saved Tags</Typography>
                                {tagSavedList.map((tag, index) => {
                                    return (
                                        <Container>
                                            <Typography key={index}>{tag}</Typography>

                                            <RemoveCircleOutlineIcon
                                                onClick={() => removeTag(index)}
                                            />
                                        </Container>
                                    )
                                })}
                            </div>
                        ) : <Typography key={tagSavedList.length}>No Saved Tags</Typography>}


                        <Typography>Add New Tags</Typography>

                        <TextField
                            key={tagSavedList.length + 1}
                            label="Add a Tag"
                            variant="standard"
                            fullWidth
                            margin="normal"
                            value={newTag}
                            onChange={handleNewTagChange}
                        />
                        <Button onClick={addNewTag}>Add new tag</Button>
                    </Container>
                } */}


                {
                    todos.length > 0 ? (
                        todos.map((card, index) => {
                            // if (menuView) { return null };
                            if (card.id === "tags") { return null };
                            if (selectedDate === "Upcomming") {
                                //Shows the next 5 tasks
                                noOfCards += 1;
                                //Cluster Them TO DATE
                                if (previousDate !== dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')) {
                                    previousDate = dayjs(card.taskDate.toDate()).format('YYYY-MM-DD');
                                    return (
                                        <Card key={card.id}>
                                            <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleUpcommingDate(card.taskDate)}</Typography>

                                            <CardActionArea>
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)} />
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                                            {
                                                                dayjs() > dayjs(card.taskDate.toDate()) ?
                                                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>OVERDUE</Typography> : null
                                                            }
                                                            <Typography variant="body1" sx={{ color: "#AFAFA7", mb: 0.3 }}>{handleData(card.taskDate)}</Typography>
                                                            <Typography variant="body1" sx={{ color: "#AFAFA7", mb: 0.3 }}>{card.content}</Typography>
                                                            {card.tasks ? (
                                                                card.tasks.map((task, index) => {
                                                                    return (
                                                                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
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
                                                            ) : (null)
                                                            }
                                                            {card.tags ? (
                                                                card.tags.map((task) => {
                                                                    return (
                                                                        <Typography>{task}</Typography>
                                                                    )
                                                                })
                                                            ) : (null)
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    )
                                } else {
                                    previousDate = dayjs(card.taskDate.toDate()).format('YYYY-MM-DD');
                                    return (
                                        <Card key={card.id}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)} />
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                                            {
                                                                dayjs() > dayjs(card.taskDate.toDate()) ?
                                                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>OVERDUE</Typography> : null
                                                            }
                                                            <Typography variant="body1" sx={{ color: "#AFAFA7", mb: 0.3 }}>{handleData(card.taskDate)}</Typography>
                                                            <Typography variant="body1" sx={{ color: "#AFAFA7", mb: 0.3 }}>{card.content}</Typography>
                                                            {card.tasks ? (
                                                                card.tasks.map((task, index) => {
                                                                    return (
                                                                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
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
                                                            ) : (null)
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    )
                                }
                                //Update this date as the last date
                            } else if (selectedDate === dayjs(card.taskDate.toDate()).format('YYYY-MM-DD')) {
                                noOfCards += 1;
                                return (
                                    <Card key={card.id}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={2}>
                                                        <Checkbox onChange={(e) => handleTaskCheckboxChange(card.id, e)} />
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.title}</Typography>
                                                        {
                                                            dayjs() > dayjs(card.taskDate.toDate()) ?
                                                                <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>OVERDUE</Typography> : null
                                                        }
                                                        <Typography variant="body2" sx={{ mb: 0.3, color: "#AFAFA7" }}>{handleData(card.taskDate)}</Typography>
                                                        <Typography variant="body2" sx={{ mb: 0.3, color: "#AFAFA7" }}>{card.content}</Typography>
                                                        {card.tasks ? (
                                                            card.tasks.map((task, index) => {
                                                                return (
                                                                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
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
                                                        ) : (null)
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            }

                            //Check if it is the last one
                            if (index === todos.length - 1) {
                                //Last one in the MAP
                                if (noOfCards === 0) {
                                    return (
                                        <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>No Tasks Today</Typography>
                                    );
                                } else {
                                    return noOfCards = 0;
                                }
                            } else return null
                        })
                    ) : (
                        <img src="../IconNoTodos.svg" alt="No Todos" loading="lazy" style={{ height: 250, marginTop: 50 }} />
                    )
                }
            </Container>
        </Box>
    );
};

export default Todos;