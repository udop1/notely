// Notes component - ADAM
// Imports
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Toolbar, Typography } from "@mui/material";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Notes = () => {
    const { notes, createNote, deleteNote } = UserAuth();
    const navigate = useNavigate();

    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [cardForDel, setCardForDel] = useState('');

    const handleNewNote = async () => {
        var docId = await createNote();
        navigate(`/notes/${docId}`);
    };

    const handleDelete = async () => {
        await deleteNote(cardForDel);
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
                            <Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Notes</Typography>
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
                            notes.length > 0 ? (
                                notes.map((note) => {
                                    return (
                                        <Card key={note.id}>
                                            <CardActionArea component={Link} to={`/notes/${note.id}`}>
                                                <CardContent>
                                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{note.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{note.modifiedDate.toDate().toDateString()}, {note.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                                                    <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1.5 }}>
                                                        {
                                                            note.tags.map((tag) => {
                                                                return (
                                                                    <Chip key={tag} size="small" label={tag} />
                                                                );
                                                            })
                                                        }
                                                    </Stack>
                                                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: `${DOMPurify.sanitize(note.content, { USE_PROFILES: { html: true } }).substring(0, 50)}...` }}></Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions disableSpacing sx={{ justifyContent: "space-evenly", pt: 0 }}>
                                                <IconButton component={Link} to={`/notes/${note.id}`}><EditIcon /></IconButton>
                                                <Divider orientation="vertical" flexItem />
                                                <IconButton onClick={() => { setCardForDel(note.id); setModalDelOpen(true) }}><DeleteIcon /></IconButton>
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
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "fixed", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={handleNewNote} icon={<NoteAddOutlinedIcon />} tooltipTitle="New Note" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <Box sx={{ p: 2 }}>
                    <DialogContent>
                        <DialogTitle sx={{ fontWeight: 700 }}>
                            Delete this note?
                        </DialogTitle>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button variant="outlined" onClick={() => setModalDelOpen(false)} autoFocus sx={{ px: 5 }}>Cancel</Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete()} sx={{ px: 5 }}>Delete</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Notes;