import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Pomodoros = () => {
    const { timers, createTimer, deleteTimer } = UserAuth();
    const navigate = useNavigate();

    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [timerForDel, setTimerForDel] = useState('');

    const handleNewTimer = async () => {
        var docId = await createTimer();
        navigate(`/pomodoros/${docId}`);
    };

    const handleDelete = async () => {
        await deleteTimer(timerForDel);
        setModalDelOpen(false);
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} sx={{ display: "flex", alignItems: "center" }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Pomodoro Timer</Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end">
                        <IconButton sx={{ color: "black", pt: 0.75 }}><SortRoundedIcon /></IconButton>
                        <IconButton sx={{ color: "black", pt: 0.75 }}><MoreHorizRoundedIcon /></IconButton>
                    </Grid>
                </Grid>
            </Container>

            <Container>
                <Stack spacing={2}>
                    {
                        timers.length > 0 ? (
                            timers.map((timer) => {
                                return (
                                    <Card key={timer.id}>
                                        <CardActionArea component={Link} to={`/pomodoros/${timer.id}`}>
                                            <CardContent>
                                                <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{timer.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{timer.modifiedDate.toDate().toDateString()}, {timer.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                                                <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1.5 }}>
                                                    {
                                                        timer.tags.map((tag) => {
                                                            return (
                                                                <Chip key={tag} size="small" label={tag} />
                                                            );
                                                        })
                                                    }
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions disableSpacing sx={{ justifyContent: "space-evenly", pt: 0 }}>
                                            <IconButton component={Link} to={`/pomodoros/${timer.id}`}><EditIcon /></IconButton>
                                            <Divider orientation="vertical" flexItem />
                                            <IconButton onClick={() => { setTimerForDel(timer.id); setModalDelOpen(true) }}><DeleteIcon /></IconButton>
                                        </CardActions>
                                    </Card>
                                );
                            })
                        ) : (
                            <img src="../IconNoNotes.svg" alt="No Notes" loading="lazy" style={{ height: 350, marginTop: 50 }} />
                        )
                    }
                </Stack>
            </Container>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={handleNewTimer} icon={<NoteAddOutlinedIcon />} tooltipTitle="New Timer" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this timer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setModalDelOpen(false)} autoFocus>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete()}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Pomodoros;