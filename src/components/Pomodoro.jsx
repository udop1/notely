import { Box, Button, Card, CardContent, Container, Grid, IconButton, Typography } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import React, { useEffect } from 'react';
import PomodoroNavBar from "./PomodoroNavBar";

const Pomodoro = () => {
    const timer = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        sessions: 0,
        remainingTime: {
            total: 0,
            minutes: 0,
            seconds: 0,
        },
    };
    let interval, fractionMode;

    const handlePlayButton = (event) => {
        const { action } = event.currentTarget.dataset;
        if (action === "start") {
            startTimer();
        } else {
            stopTimer();
        }
    };

    function handleSkipButton() {
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

    function updateClock(mode) {
        const { remainingTime } = timer;
        const minutes = `${remainingTime.minutes}`.padStart(2, "0");
        const seconds = `${remainingTime.seconds}`.padStart(2, "0");

        const min = document.getElementById("js-minutes");
        const sec = document.getElementById("js-seconds");
        min.textContent = minutes;
        sec.textContent = seconds;

        setCircleDasharray(mode);
    }

    function switchMode(mode) {
        timer.mode = mode;
        timer.remainingTime = {
            total: timer[mode] * 60,
            minutes: timer[mode],
            seconds: 0,
        };

        updateClock(mode);
    }

    function calculateTimeFraction(mode) {
        if (mode !== undefined) {
            fractionMode = mode;
        }
        const rawTimeFraction = timer.remainingTime.total / (timer[fractionMode] * 60);
        return rawTimeFraction - (1 / (timer[fractionMode] * 60)) * (1 - rawTimeFraction);
    }

    function setCircleDasharray(mode) {
        const circleDasharray = `${(calculateTimeFraction(mode) * 283).toFixed(0)} 283`;
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
    }

    useEffect(() => {
        setTimeout(() => {
            switchMode("pomodoro");
        }, 1000);

        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            <PomodoroNavBar />
            <Container>
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
                </Card>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
                    <Box className="base-timer" sx={{ position: "relative", height: "300px", width: "300px" }}>
                        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
                            <g className="base-timer__circle" style={{ fill: "none", stroke: "none" }}>
                                <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" style={{ strokeWidth: "7px", stroke: "grey" }} />
                                <path id="base-timer-path-remaining" className="base-timer__path-remaining" strokeDasharray="283" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" style={{ strokeWidth: "7px", strokeLinecap: "round", transform: "rotate(90deg)", transformOrigin: "center", transition: "1s linear all", stroke: "black" }}></path>
                            </g>
                        </svg>
                        <span id="base-timer-label" className="base-timer__label" style={{ position: "absolute", width: "300px", height: "300px", top: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontSize: "48px", fontWeight: "700" }}>
                            <Box>
                                <span id="js-minutes">00</span>
                                <span className="separator">:</span>
                                <span id="js-seconds">00</span>
                            </Box>
                            <Box>
                                <Typography id="current-work" variant="h6" sx={{ fontWeight: 700 }}>Work Time</Typography>
                            </Box>
                        </span>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="center">
                    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} endIcon={<PauseRoundedIcon />} className="main-button" data-action="start" id="js-btn" onClick={handlePlayButton}></Button>
                    <IconButton onClick={handleSkipButton}><SkipNextRoundedIcon /></IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Pomodoro;