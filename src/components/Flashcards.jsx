import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Flashcards = () => {
    const { flashcards, createFlashcardGroup, deleteFlashcardGroup } = UserAuth();
    const navigate = useNavigate();

    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [flashcardForDel, setFlashcardForDel] = useState('');

    const handleNewFlashcard = async () => {
        var docId = await createFlashcardGroup();
        navigate(`/flashcards/${docId}`);
    };

    const handleDelete = async () => {
        await deleteFlashcardGroup(flashcardForDel);
        setModalDelOpen(false);
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} sx={{ display: "flex", alignItems: "center" }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Flashcards</Typography>
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
                        flashcards.length > 0 ? (
                            flashcards.map((flashcard) => {
                                return (
                                    <Card key={flashcard.id}>
                                        <CardActionArea component={Link} to={`/flashcards/${flashcard.id}`}>
                                            <CardContent>
                                                <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{flashcard.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{flashcard.modifiedDate.toDate().toDateString()}, {flashcard.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                                                <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1.5 }}>
                                                    {
                                                        flashcard.tags.map((tag) => {
                                                            return (
                                                                <Chip key={tag} size="small" label={tag} />
                                                            );
                                                        })
                                                    }
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions disableSpacing sx={{ justifyContent: "space-evenly", pt: 0 }}>
                                            <IconButton component={Link} to={`/flashcards/${flashcard.id}`}><EditIcon /></IconButton>
                                            <Divider orientation="vertical" flexItem />
                                            <IconButton onClick={() => { setFlashcardForDel(flashcard.id); setModalDelOpen(true) }}><DeleteIcon /></IconButton>
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
                <SpeedDialAction onClick={handleNewFlashcard} icon={<PostAddIcon />} tooltipTitle="New Flashcard Group" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this flashcard group?
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

export default Flashcards;