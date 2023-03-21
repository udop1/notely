import { Box, Chip, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import { React, useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Note = () => {
    const { user } = UserAuth();
    const { noteId } = useParams();
    const [noteData, setNoteData] = useState(null);

    useEffect(() => {
        getDoc(doc(db, "users", user.uid, "notes", noteId)).then((note) => setNoteData(note.data()));
    }, [user, noteId]);

    return (
        <Box>
            <NavBar />
            <Container>
                <Typography variant="h6" sx={{ fontWeight: "700", mb: 1 }}>{noteData.title}</Typography>
                <Grid container spacing={1} columns={12}>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Last Modified</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">{noteData.date.toDate().toDateString()}, {noteData.date.toDate().toLocaleTimeString('en-GB')}</Typography>
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


                <Typography variant="body1" sx={{ mt: 2.5 }}>{noteData.content}</Typography>
            </Container>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<LocalOfferOutlinedIcon />} tooltipTitle="Add Tags" sx={{ color: "black" }} />
                <SpeedDialAction icon={<EditOutlinedIcon />} tooltipTitle="Edit Note" sx={{ color: "black" }} />
            </SpeedDial>
        </Box>
    );
};

export default Note;