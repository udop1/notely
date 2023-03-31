import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import React from 'react';
import { UserAuth } from '../context/AuthContext';
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = UserAuth();

    return (
        <Box>
            <NavBar />
            <Container>
                <Typography variant="h6">Hey, {user && user.displayName}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "700" }}>Let's get productive!</Typography>

                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea component={Link} to="/todos">
                                    <CardContent>
                                        <ListRoundedIcon sx={{ mb: 1, fontSize: 50 }} />
                                        <Typography variant="body1" sx={{ fontWeight: "700" }}>To-do list</Typography>
                                        <Typography variant="body2">Stay organised with our easy to use to-do list.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea component={Link} to="/notes">
                                    <CardContent>
                                        <DescriptionOutlinedIcon sx={{ mb: 1, fontSize: 50 }} />
                                        <Typography variant="body1" sx={{ fontWeight: "700" }}>Notes</Typography>
                                        <Typography variant="body2">Capture your thoughts on the go with our notes.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea component={Link} to="/whiteboard">
                                    <CardContent>
                                        <DeveloperBoardIcon sx={{ mb: 1, fontSize: 50 }} />
                                        <Typography variant="body1" sx={{ fontWeight: "700" }}>Whiteboard</Typography>
                                        <Typography variant="body2">Visualise your ideas with our digital whiteboard.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea component={Link} to="/flashcards">
                                    <CardContent>
                                        <StyleOutlinedIcon sx={{ mb: 1, fontSize: 50 }} />
                                        <Typography variant="body1" sx={{ fontWeight: "700" }}>Flashcards</Typography>
                                        <Typography variant="body2">Master any subject with our interactive flashcards.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea component={Link} to="/pomodoro">
                                    <CardContent>
                                        <TimerOutlinedIcon sx={{ mb: 1, fontSize: 50 }} />
                                        <Typography variant="body1" sx={{ fontWeight: "700" }}>Pomodoro Timer</Typography>
                                        <Typography variant="body2">Stay focused with our Pomodoro timer.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;