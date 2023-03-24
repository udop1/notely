import { Alert, AlertTitle, Box, Chip, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Editor } from "@tinymce/tinymce-react";

const Note = () => {
    const { user, updateNote } = UserAuth();
    const { noteId } = useParams();
    const [noteData, setNoteData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

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
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid]);

    const editorRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editorRef.current) {
                await updateNote(noteId, title, editorRef.current.getContent());
            }
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    if (!noteData) return <div>Loading...</div>;

    return (
        <Box>
            <NavBar />
            {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
            <Container component="form" onSubmit={handleSubmit}>
                <TextField multiline fullWidth variant="standard" size="small" label="Title" defaultValue={title} InputProps={{ readOnly: !isEditing }} onChange={(e) => setTitle(e.target.value)} />
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
                        <Stack direction="row" spacing={1} sx={{ overflow: "scroll" }}>
                            {
                                noteData.tags.map((tag) => {
                                    return (
                                        <Chip key={tag} size="small" label={tag} />
                                    );
                                })
                            }
                        </Stack>
                    </Grid>
                </Grid>

                <Editor
                    tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={noteData.content}
                    disabled={!isEditing}
                    init={{
                        height: 500,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                    }}
                />
                {/* <button type="submit">Save</button> */}
            </Container>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<LocalOfferOutlinedIcon />} tooltipTitle="Add Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setIsEditing(true)} icon={<EditOutlinedIcon />} tooltipTitle="Edit Note" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Note" sx={{ color: "black" }} />
            </SpeedDial>
        </Box>
    );
};

export default Note;