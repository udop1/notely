// Note component - ADAM
// Imports
import { Alert, AlertTitle, Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Toolbar, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Editor } from "@tinymce/tinymce-react";

const Note = () => {
    // Variables
    const navigate = useNavigate();
    const { user, updateNote, deleteNote } = UserAuth();
    const { noteId } = useParams();
    const [noteData, setNoteData] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [modalTagOpen, setModalTagOpen] = useState(false);
    const [tagFields, setTagFields] = useState([]);
    const [saveRevision, setSaveRevision] = useState(0); //If used to update page info, data is updated before changed meaning always 0
    const [isSaving, setIsSaving] = useState(0); //When changed, update page info

    // Get user data
    async function getData(userId) {
        const queryData = await getDoc(doc(db, "users", userId, "notes", noteId));

        return queryData;
    }

    useEffect(() => {
        const userId = user && user.uid;
        // let detached = false;
        getData(userId)
            .then((note) => {
                // if (detached) return;
                setNoteData(note.data());
                setTitle(note.data().title);
                setTagFields(note.data().tags);
                setSaveRevision(note.data().revisionNumber);
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid, isSaving]);

    const handleDelete = async (removeNote) => {
        if (removeNote === true) {
            await deleteNote(noteId);
            navigate("/notes");
        } else {
            setModalDelOpen(false);
        }
    };

    const editorRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editorRef.current) {
                setSaveRevision((saveRevision) => saveRevision + 1);
                await updateNote(noteId, title, editorRef.current.getContent(), tagFields, saveRevision);
            }
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

    // Wait for user data before loading page
    if (!noteData) return <div>Loading...</div>;

    return (
        <Box className="desktop-navbar-container" sx={{ display: "flex", mx: 5 }}>
            <NavBar />
            {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
            <Box className="desktop-undernav-content" sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />
                <Box component="form" onSubmit={handleSubmit}>
                    <Container>
                        <TextField multiline fullWidth variant="standard" size="small" label="Title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                        <Grid container spacing={1} columns={12} sx={{ mt: 1.5, mb: 2.5 }}>
                            <Grid item xs={4}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Last Modified</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2" color="text.secondary">{noteData.modifiedDate.toDate().toDateString()}, {noteData.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Tags</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
                                    {
                                        tagFields.map((tag) => {
                                            return (
                                                <Chip key={tag} size="small" label={tag} sx={{ fontWeight: 700 }} />
                                            );
                                        })
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>

                    <Editor
                        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={noteData.content}
                        init={{
                            height: 470,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                    />
                </Box>
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "fixed", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => setModalDelOpen(true)} icon={<DeleteOutlinedIcon />} tooltipTitle="Delete Note" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalTagOpen(true)} icon={<LocalOfferOutlinedIcon />} tooltipTitle="Modify Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Note" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <Box sx={{ p: 2 }}>
                    <DialogContent>
                        <DialogTitle sx={{ fontWeight: 700 }}>
                            Delete this note?
                        </DialogTitle>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button variant="outlined" onClick={() => handleDelete(false)} autoFocus sx={{ px: 5 }}>Cancel</Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete(true)} sx={{ px: 5 }}>Delete</Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog component="form" open={modalTagOpen} onSubmit={(e) => { e.preventDefault(); setModalTagOpen(false); }} aria-labelledby="modal-tag-title" aria-describedby="modal-tag-description">
                <Box sx={{ p: 2 }}>
                    <DialogTitle sx={{ fontWeight: 700 }}>Add Tags</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: 2 }}>
                            Add some tags to your note here.
                        </DialogContentText>

                        {tagFields.map((tagValue, index) => (
                            <Stack key={index} direction="row" sx={{ mb: 1 }}>
                                <TextField required size="small" variant="standard" value={tagValue} onChange={(e) => handleTagChange(index, e.target.value)} sx={{ width: "100%" }} />
                                <IconButton onClick={() => handleRemoveTag(index)}><RemoveCircleRoundedIcon /></IconButton>
                            </Stack>
                        ))}
                        <IconButton onClick={handleAddTag}><AddCircleOutlineRoundedIcon /></IconButton>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button type="submit" variant="contained" autoFocus sx={{ px: 5 }}>Confirm</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Note;