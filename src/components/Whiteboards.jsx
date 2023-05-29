// Whiteboards component - ADAM
// Imports
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Toolbar, Typography } from "@mui/material";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Whiteboards = () => {
    const { whiteboards, createWhiteboard, deleteWhiteboard } = UserAuth();
    const navigate = useNavigate();

    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [boardForDel, setBoardForDel] = useState('');

    const handleNewWhiteboard = async () => {
        var docId = await createWhiteboard();
        navigate(`/whiteboards/${docId}`);
    };

    const handleDelete = async () => {
        await deleteWhiteboard(boardForDel);
        setModalDelOpen(false);
    };

    return (
        <Box className="desktop-navbar-container" sx={{ display: "flex", mx: 5 }}>
            <NavBar />
            <Box className="desktop-undernav-content" sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />
                <Container sx={{ mb: 2 }}>
                    <Grid container columns={12} sx={{ display: "flex", alignItems: "center" }}>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Whiteboards</Typography>
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
                            whiteboards.length > 0 ? (
                                whiteboards.map((whiteboard) => {
                                    return (
                                        <Card key={whiteboard.id}>
                                            <CardActionArea component={Link} to={`/whiteboards/${whiteboard.id}`}>
                                                <CardContent>
                                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{whiteboard.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{whiteboard.modifiedDate.toDate().toDateString()}, {whiteboard.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                                                    <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1.5 }}>
                                                        {
                                                            whiteboard.tags.map((tag) => {
                                                                return (
                                                                    <Chip key={tag} size="small" label={tag} />
                                                                );
                                                            })
                                                        }
                                                    </Stack>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions disableSpacing sx={{ justifyContent: "space-evenly", pt: 0 }}>
                                                <IconButton component={Link} to={`/whiteboards/${whiteboard.id}`}><EditIcon /></IconButton>
                                                <Divider orientation="vertical" flexItem />
                                                <IconButton onClick={() => { setBoardForDel(whiteboard.id); setModalDelOpen(true) }}><DeleteIcon /></IconButton>
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

                <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "fixed", bottom: 16, right: 16 }}>
                    <SpeedDialAction onClick={handleNewWhiteboard} icon={<DashboardCustomizeOutlinedIcon />} tooltipTitle="New Whiteboard" sx={{ color: "black" }} />
                </SpeedDial>

                <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                    <DialogContent>
                        <DialogContentText>
                            Delete this whiteboard?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => setModalDelOpen(false)} autoFocus>Cancel</Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete()}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default Whiteboards;