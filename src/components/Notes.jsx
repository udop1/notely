import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import React from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Notes = () => {
    const { notes, createNote } = UserAuth();
    const navigate = useNavigate();

    const handleNewNote = async () => {
        var docId = await createNote();
        navigate(`/notes/${docId}`);
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<DescriptionOutlinedIcon />} endIcon={<ArrowForwardIosRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Notes</Typography></Button>
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
                                                <Typography variant="body" dangerouslySetInnerHTML={{ __html: `${DOMPurify.sanitize(note.content, { USE_PROFILES: { html: true } }).substring(0, 50)}...` }}></Typography>
                                            </CardContent>
                                        </CardActionArea>
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
                <SpeedDialAction icon={<CreateNewFolderOutlinedIcon />} tooltipTitle="New Folder" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleNewNote} icon={<NoteAddOutlinedIcon />} tooltipTitle="New Note" sx={{ color: "black" }} />
            </SpeedDial>
        </Box>
    );
};

export default Notes;