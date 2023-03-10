import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <AppBar position="static" sx={{ mb: 3 }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <MenuRoundedIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "700" }}>Notely</Typography>
                    <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2 }}>
                        <SearchRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h6">Hey, {user && user.displayName}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "700" }}>Let's get productive!</Typography>

                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <ListRoundedIcon sx={{mb: 1, fontSize: 50}} />
                                        <Typography variant="body1" sx={{ fontWeight: "700"}}>To-do list</Typography>
                                        <Typography variant="body2">Stay organised with our easy to use to-do list.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <DescriptionOutlinedIcon sx={{mb: 1, fontSize: 50}} />
                                        <Typography variant="body1" sx={{ fontWeight: "700"}}>Notes</Typography>
                                        <Typography variant="body2">Capture your thoughts on the go with our notes.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <DeveloperBoardIcon sx={{mb: 1, fontSize: 50}} />
                                        <Typography variant="body1" sx={{ fontWeight: "700"}}>Whiteboard</Typography>
                                        <Typography variant="body2">Visualise your ideas with our digital whiteboard.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <StyleOutlinedIcon sx={{mb: 1, fontSize: 50}} />
                                        <Typography variant="body1" sx={{ fontWeight: "700"}}>Flashcard</Typography>
                                        <Typography variant="body2">Master any subject with our interactive flashcards.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <TimerOutlinedIcon sx={{mb: 1, fontSize: 50}} />
                                        <Typography variant="body1" sx={{ fontWeight: "700"}}>Pomodoro Timer</Typography>
                                        <Typography variant="body2">Stay focused with our Pomodoro timer.</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* <Button variant="contained" onClick={handleLogout}>Logout</Button> */}
            </Container>
        </Box>
    );
};

export default Dashboard;