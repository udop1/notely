import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Pomodoro = () => {
    const navigate = useNavigate();
    const { user, updateTimer, deleteTimer } = UserAuth();
    const { timerId } = useParams();
    const [timerData, setTimerData] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [modalTagOpen, setModalTagOpen] = useState(false);
    const [tagFields, setTagFields] = useState([]);
    const [saveRevision, setSaveRevision] = useState(0); //If used to update page info, data is updated before changed meaning always 0
    const [isSaving, setIsSaving] = useState(0); //When changed, update page info

    const timer = {
        pomodoro: 0.05,
        shortBreak: 0.1,
        longBreak: 0.5,
        longBreakInterval: 4,
        sessions: 0,
        remainingTime: {
            timer: 0,
            minutes: 0,
            seconds: 0,
        },
    };
    let interval;

    async function getData(userId) {
        const queryData = await getDoc(doc(db, "users", userId, "pomodoros", timerId));

        return queryData;
    }

    useEffect(() => {
        const userId = user && user.uid;
        // let detached = false;
        getData(userId)
            .then((timer) => {
                // if (detached) return;
                setTimerData(timer.data());
                setTitle(timer.data().title);
                setTagFields(timer.data().tags);
                setSaveRevision(timer.data().revisionNumber);
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid, isSaving]);

    const handleDelete = async (removeTimer) => {
        if (removeTimer === true) {
            await deleteTimer(timerId);
            navigate("/pomodoros");
        } else {
            setModalDelOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setSaveRevision((saveRevision) => saveRevision + 1);
            // await updateTimer(timerId, title, workTime, shortBreak, longBreak, tagFields, saveRevision);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }

        setIsSaving((isSaving) => isSaving + 1);
    };

    const handleAddTag = () => {
        setTagFields([...tagFields, ""]); //Add empty tag value
    };

    const handleRemoveTag = (index) => {
        setTagFields((prevTagValues) => {
            const newTagValues = [...prevTagValues];
            newTagValues.splice(index, 1); //Remove tag value at index
            return newTagValues;
        });
    };

    const handleTagChange = (index, value) => {
        setTagFields((prevTagValues) => {
            const newTagValues = [...prevTagValues];
            newTagValues[index] = value; //Update tag value at index
            return newTagValues;
        });
    };

    const handlePlayButton = (event) => {
        const { action } = event.currentTarget.dataset;
        if (action === "start") {
            startTimer();
        } else {
            stopTimer();
        }
    };

    function getRemainingTime(endTime) {
        const currentTime = Date.parse(new Date());
        const difference = endTime - currentTime;

        const total = Number.parseInt(difference / 1000, 10);
        const minutes = Number.parseInt((total / 60) % 60, 10);
        const seconds = Number.parseInt(total % 60, 10);

        return { total, minutes, seconds };
    }

    function startTimer() {
        const mainButton = document.getElementById("js-btn");
        let { total } = timer.remainingTime;
        const endTime = Date.parse(new Date()) + total * 1000;

        if (timer.mode === "pomodoro") timer.sessions++;

        mainButton.dataset.action = "stop";
        mainButton.classList.add("active");

        interval = setInterval(function () {
            timer.remainingTime = getRemainingTime(endTime);
            updateClock();

            total = timer.remainingTime.total;
            if (total <= 0) {
                clearInterval(interval);

                switch (timer.mode) {
                    case "pomodoro":
                        if (timer.sessions % timer.longBreakInterval === 0) {
                            switchMode("longBreak");
                        } else {
                            switchMode("shortBreak");
                        }
                        break;
                    default:
                        switchMode("pomodoro");
                }

                if (timer.mode === "pomodoro") {
                    document.getElementById("current-work").innerText = "Work Time";
                } else if (timer.mode === "shortBreak") {
                    document.getElementById("current-work").innerText = "Short Break";
                } else {
                    document.getElementById("current-work").innerText = "Long Break";
                }

                startTimer();
            }
        }, 1000);
    }

    function stopTimer() {
        const mainButton = document.getElementById("js-btn");
        clearInterval(interval);

        mainButton.dataset.action = "start";
        mainButton.classList.remove("active");
    }

    function updateClock() {
        const { remainingTime } = timer;
        const minutes = `${remainingTime.minutes}`.padStart(2, "0");
        const seconds = `${remainingTime.seconds}`.padStart(2, "0");

        const min = document.getElementById("js-minutes");
        const sec = document.getElementById("js-seconds");
        min.textContent = minutes;
        sec.textContent = seconds;
    }

    function switchMode(mode) {
        timer.mode = mode;
        timer.remainingTime = {
            total: timer[mode] * 60,
            minutes: timer[mode],
            seconds: 0,
        };

        updateClock();
    }

    useEffect(() => {
        setTimeout(() => {
            switchMode("pomodoro");
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerData]);

    if (!timerData) return <div>Loading...</div>;

    return (
        <Box>
            <NavBar />
            {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
                <Container>
                    <TextField multiline fullWidth variant="standard" size="small" label="Title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                    <Grid container spacing={1} columns={12} sx={{ mt: 1.5, mb: 2.5 }}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Last Modified</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" color="text.secondary">{timerData.modifiedDate.toDate().toDateString()}, {timerData.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Tags</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
                                {
                                    tagFields.map((tag) => {
                                        return (
                                            <Chip key={tag} size="small" label={tag} />
                                        );
                                    })
                                }
                            </Stack>
                        </Grid>
                    </Grid>

                    <Card>
                        <CardContent>
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={4}>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>Work</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{timer.pomodoro} minutes</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>Short Break</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{timer.shortBreak} minutes</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>Long Break</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{timer.longBreak} minutes</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/* Open an edit modal where the user can change their work, short, and long break times. These changes the states which get saved if the user saves */}
                        <CardActions disableSpacing sx={{ justifyContent: "space-evenly", pt: 0 }}>
                            <IconButton><EditIcon /></IconButton>
                        </CardActions>
                    </Card>

                    <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                        <Typography id="current-work" variant="h6" sx={{ fontWeight: 700 }}>Work Time</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                        <Box className="base-timer" sx={{ position: "relative", height: "300px", width: "300px" }}>
                            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
                                <g className="base-timer__circle" style={{ fill: "none", stroke: "none" }}>
                                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" style={{ strokeWidth: "7px", stroke: "grey" }} />
                                    <path id="base-timer-path-remaining" className="base-timer__path-remaining" strokeDasharray="283" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" style={{ strokeWidth: "7px", strokeLinecap: "round", transform: "rotate(90deg)", transformOrigin: "center", transition: "1s linear all", stroke: "black" }}></path>
                                </g>
                            </svg>
                            <span id="base-timer-label" className="base-timer__label" style={{ position: "absolute", width: "300px", height: "300px", top: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", fontWeight: "700" }}>
                                <span id="js-minutes">00</span>
                                <span className="separator">:</span>
                                <span id="js-seconds">00</span>
                            </span>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} endIcon={<PauseRoundedIcon />} className="main-button" data-action="start" id="js-btn" onClick={handlePlayButton}></Button>
                        <IconButton><SkipNextRoundedIcon /></IconButton>
                    </Box>
                </Container>
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => setModalDelOpen(true)} icon={<DeleteOutlinedIcon />} tooltipTitle="Delete Timer" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalTagOpen(true)} icon={<LocalOfferOutlinedIcon />} tooltipTitle="Modify Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Timer" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this timer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => handleDelete(false)} autoFocus>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(true)}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog component="form" open={modalTagOpen} onSubmit={(e) => { e.preventDefault(); setModalTagOpen(false); }} aria-labelledby="modal-tag-title" aria-describedby="modal-tag-description">
                <DialogTitle>Add Tags</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Add some tags to your timer here.
                    </DialogContentText>

                    {tagFields.map((tagValue, index) => (
                        <Stack key={index} direction="row" sx={{ mb: 1 }}>
                            <TextField required size="small" variant="standard" value={tagValue} onChange={(e) => handleTagChange(index, e.target.value)} />
                            <IconButton onClick={() => handleRemoveTag(index)}><RemoveCircleRoundedIcon /></IconButton>
                        </Stack>
                    ))}
                    <IconButton onClick={handleAddTag}><AddCircleOutlineRoundedIcon /></IconButton>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Pomodoro;