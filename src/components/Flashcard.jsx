import { Alert, AlertTitle, Box, Button, Card, CardActionArea, CardContent, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Flashcard = () => {
    const navigate = useNavigate();
    const { user, updateFlashcard, deleteFlashcard } = UserAuth();
    const { cardId } = useParams();
    const [flashcardData, setFlashcardData] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [modalTagOpen, setModalTagOpen] = useState(false);
    const [tagFields, setTagFields] = useState([]);
    const [saveRevision, setSaveRevision] = useState(0); //If used to update page info, data is updated before changed meaning always 0
    const [isSaving, setIsSaving] = useState(0); //When changed, update page info


    async function getData(userId) {
        const queryData = await getDoc(doc(db, "users", userId, "flashcards", cardId));

        return queryData;
    }

    useEffect(() => {
        const userId = user && user.uid;
        // let detached = false;
        getData(userId)
            .then((flashcard) => {
                // if (detached) return;
                setFlashcardData(flashcard.data());
                setTitle(flashcard.data().title);
                setTagFields(flashcard.data().tags);
                setSaveRevision(flashcard.data().revisionNumber);
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid, isSaving]);

    const handleDelete = async (removeFlashcard) => {
        if (removeFlashcard === true) {
            await deleteFlashcard(cardId);
            navigate("/flashcards");
        } else {
            setModalDelOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setSaveRevision((saveRevision) => saveRevision + 1);
            // await updateFlashcard(cardId, title, editorRef.current.getContent(), tagFields, saveRevision);
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

    if (!flashcardData) return <div>Loading...</div>;

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
                            <Typography variant="body2" color="text.secondary">{flashcardData.modifiedDate.toDate().toDateString()}, {flashcardData.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Tags</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
                                {
                                    flashcardData.tags.map((tag) => {
                                        return (
                                            <Chip key={tag} size="small" label={tag} />
                                        );
                                    })
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>

                <Container>
                    <Card sx={{ mb: 5, py: 10, textAlign: "center" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "700" }}>Adult Stem Cell</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Stack spacing={2}>
                        <Card>
                            <Grid container spacing={1} sx={{ alignItems: "center" }}>
                                <Grid item xs={10}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>Adult Stem Cell</Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>A type of stem cell that can form many types of cells.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton>
                                        <MoreHorizRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card>
                            <Grid container spacing={1} sx={{ alignItems: "center" }}>
                                <Grid item xs={10}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>Cell Differentiation</Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>The process where a cell become specialised to its function.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton>
                                        <MoreHorizRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Card>
                        <Card>
                            <Grid container spacing={1} sx={{ alignItems: "center" }}>
                                <Grid item xs={10}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>Cell Membrane</Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>A partially permeable barrier that surrounds the cell.</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton>
                                        <MoreHorizRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Card>
                    </Stack>
                </Container>
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => setModalDelOpen(true)} icon={<DeleteOutlinedIcon />} tooltipTitle="Delete Flashcard Group" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalTagOpen(true)} icon={<LocalOfferOutlinedIcon />} tooltipTitle="Modify Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Flashcard" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this Flashcard?
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
                        Add some tags to your flashcard here.
                    </DialogContentText>

                    {tagFields.map((tagValue, index) => (
                        <Stack key={index} direction="row" sx={{ mb: 1 }}>
                            <TextField required size="small" value={tagValue} onChange={(e) => handleTagChange(index, e.target.value)} />
                            <IconButton onClick={() => handleRemoveTag(index)}><RemoveCircleRoundedIcon /></IconButton>
                        </Stack>
                    ))}
                    <IconButton onClick={handleAddTag}><AddCircleOutlineRoundedIcon /></IconButton>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default Flashcard;