// Dashboard component - ADAM
// Imports
import { Box, Card, CardActionArea, CardContent, Container, Grid, Toolbar, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = UserAuth();

    const [toggleDrawer, setToggleDrawer] = useState(true);

    //Override default style
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: '-250px',
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    return (
        <Box className="desktop-navbar-container" sx={{ display: "flex" }}>
            <NavBar toggleDrawer={toggleDrawer} setToggleDrawer={() => setToggleDrawer(!toggleDrawer)} />
            <Box className="desktop-undernav-content" component={Main} open={toggleDrawer} sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />
                <Container id="desktop-dashboard-container" sx={{ "&&": { px: 10 } }}>
                    <Typography variant="h6" sx={{ fontWeight: "700" }}>Hey, {user && user.displayName}</Typography>
                    <Typography variant="h6">Let's get productive!</Typography>

                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={6}>
                                <Card sx={{ height: "100%" }} >
                                    <CardActionArea component={Link} to="/todos">
                                        <CardContent>
                                            <img src="./IconTodo.svg" alt="Todo Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                            <Typography variant="body1" sx={{ fontWeight: "700" }}>To-do list</Typography>
                                            <Typography variant="body2">Stay organised with our easy to use to-do list.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ height: "100%" }} >
                                    <CardActionArea component={Link} to="/notes">
                                        <CardContent>
                                            <img src="./IconNotes.svg" alt="Notes Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                            <Typography variant="body1" sx={{ fontWeight: "700" }}>Notes</Typography>
                                            <Typography variant="body2">Capture your thoughts on the go with our notes.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ height: "100%" }} >
                                    <CardActionArea component={Link} to="/whiteboards">
                                        <CardContent>
                                            <img src="./IconWhiteboard.svg" alt="Whiteboards Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                            <Typography variant="body1" sx={{ fontWeight: "700" }}>Whiteboard</Typography>
                                            <Typography variant="body2">Visualise your ideas with our digital whiteboard.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ height: "100%" }} >
                                    <CardActionArea component={Link} to="/flashcards">
                                        <CardContent>
                                            <img src="./IconFlashcard.svg" alt="Flashcards Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                            <Typography variant="body1" sx={{ fontWeight: "700" }}>Flashcards</Typography>
                                            <Typography variant="body2">Master any subject with our interactive flashcards.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ height: "100%" }} >
                                    <CardActionArea component={Link} to="/pomodoro">
                                        <CardContent>
                                            <img src="./IconPomodoro.svg" alt="Pomodoro Timer Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                            <Typography variant="body1" sx={{ fontWeight: "700" }}>Pomodoro Timer</Typography>
                                            <Typography variant="body2">Stay focused with our Pomodoro timer.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid >
                    </Box >
                </Container >
            </Box >
        </Box >
    );
};

export default Dashboard;