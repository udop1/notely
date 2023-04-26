import { Alert, AlertTitle, Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Collapse, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Typography, styled } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import React, { useCallback, useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Flashcard = () => {
    const navigate = useNavigate();
    const { user, updateFlashcardGroup, deleteFlashcardGroup } = UserAuth();
    const { cardId } = useParams();
    const [flashcardData, setFlashcardData] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState('');
    const [flip, setFlip] = useState(false);
    const [mainTerm, setMainTerm] = useState('');
    const [mainDef, setMainDef] = useState('');
    const [modalDelGroupOpen, setModalDelGroupOpen] = useState(false);
    const [modalTagOpen, setModalTagOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [tagFields, setTagFields] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [addTerm, setAddTerm] = useState('');
    const [addDef, setAddDef] = useState('');
    const [editTerm, setEditTerm] = useState('');
    const [editDef, setEditDef] = useState('');
    const [editCardIndex, setEditCardIndex] = useState(0);
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
                setCards(flashcard.data().cards);
                setSaveRevision(flashcard.data().revisionNumber);
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid, isSaving]);

    const handleCardGroupDelete = async (removeFlashcard) => {
        if (removeFlashcard === true) {
            await deleteFlashcardGroup(cardId);
            navigate("/flashcards");
        } else {
            setModalDelGroupOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setSaveRevision((saveRevision) => saveRevision + 1);
            await updateFlashcardGroup(cardId, title, cards, tagFields, saveRevision);
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

    const setMainCard = (index) => {
        setFlip(false);
        setMainTerm(flashcardData.cards[index].term);
        setMainDef(flashcardData.cards[index].definition);
    }

    const elemRef = useCallback((node) => {
        if (node !== null) {
            setMainCard(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flashcardData]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        var newCards = cards.slice();
        newCards.push({ term: addTerm, definition: addDef });
        setCards(newCards);

        setModalAddOpen(false);
    }

    const handleEditCard = (e) => {
        e.preventDefault();
        var newCards = cards.slice();
        newCards.splice(editCardIndex, 1, { term: editTerm, definition: editDef });
        setCards(newCards);

        setModalEditOpen(false);
    }

    const handleCardDelete = (cardIndex) => {
        var newCards = cards.slice();
        newCards.splice(cardIndex, 1);
        setCards(newCards);
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
                    <Card ref={elemRef} sx={{ mb: 5, textAlign: "center" }}>
                        <CardActionArea onClick={() => setFlip(!flip)} sx={{ py: 10 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: "700" }}>{flip ? mainDef : mainTerm}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Stack spacing={2}>
                        {cards.map((flashcard, index) => {
                            return (
                                <Card key={index}>
                                    <CardActionArea onClick={() => setMainCard(index)}>
                                        <CardContent>
                                            <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{flashcard.term}</Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>{flashcard.definition}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions disableSpacing>
                                        <ExpandMore expand={expanded} onClick={handleExpandClick}>
                                            <ExpandMoreRoundedIcon />
                                        </ExpandMore>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <Button onClick={() => { setEditCardIndex(index); setEditTerm(cards[index].term); setEditDef(cards[index].definition); setModalEditOpen(true) }}>Edit</Button>
                                            <Button onClick={() => handleCardDelete(index)}>Delete</Button>
                                        </Collapse>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Stack>
                </Container>
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => setModalDelGroupOpen(true)} icon={<DeleteOutlinedIcon />} tooltipTitle="Delete Flashcard Group" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalTagOpen(true)} icon={<LocalOfferOutlinedIcon />} tooltipTitle="Modify Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalAddOpen(true)} icon={<SpeedDialIcon />} tooltipTitle="Add Flashcard" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Flashcard Group" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog component="form" open={modalAddOpen} onSubmit={handleAddCard} aria-labelledby="modal-add-title" aria-describedby="modal-add-description">
                <DialogTitle>Add Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Add some cards to your flashcard group here.
                    </DialogContentText>

                    <Stack>
                        <TextField required onChange={(e) => setAddTerm(e.target.value)} label="Term" sx={{ mb: 2 }}></TextField>
                        <TextField required onChange={(e) => setAddDef(e.target.value)} label="Definition"></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setModalAddOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="contained" autoFocus>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog component="form" open={modalEditOpen} onSubmit={handleEditCard} aria-labelledby="modal-add-title" aria-describedby="modal-add-description">
                <DialogTitle>Edit Flashcards</DialogTitle>
                <DialogContent>
                    <Stack>
                        <TextField required value={editTerm} onChange={(e) => setEditTerm(e.target.value)} label="Term" sx={{ my: 2 }}></TextField>
                        <TextField required value={editDef} onChange={(e) => setEditDef(e.target.value)} label="Definition"></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setModalEditOpen(false)} autoFocus>Cancel</Button>
                    <Button type="submit" variant="contained">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={modalDelGroupOpen} onClose={() => setModalDelGroupOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this Flashcard Group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => handleCardGroupDelete(false)} autoFocus>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => handleCardGroupDelete(true)}>Delete</Button>
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
        </Box>
    );
};

export default Flashcard;