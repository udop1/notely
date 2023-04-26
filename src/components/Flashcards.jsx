import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import React from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Flashcards = () => {
    const { flashcards, createFlashcardGroup } = UserAuth();
    const navigate = useNavigate();

    const handleNewFlashcard = async () => {
        var docId = await createFlashcardGroup();
        navigate(`/flashcards/${docId}`);
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<DescriptionOutlinedIcon />} endIcon={<ArrowForwardIosRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Flashcard Groups</Typography></Button>
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
                                </Card>
                            );
                        })
                    }
                </Stack>
            </Container>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<CreateNewFolderOutlinedIcon />} tooltipTitle="New Folder" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleNewFlashcard} icon={<PostAddIcon />} tooltipTitle="New Flashcard Group" sx={{ color: "black" }} />
            </SpeedDial>
        </Box>
    );
};

export default Flashcards;