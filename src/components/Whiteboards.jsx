import { Box, Button, Card, CardActionArea, CardContent, Chip, Container, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, Typography } from "@mui/material";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import React from 'react';
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Whiteboards = () => {
    const { whiteboards, createWhiteboard } = UserAuth();
    const navigate = useNavigate();

    const handleNewWhiteboard = async () => {
        var docId = await createWhiteboard();
        navigate(`/whiteboards/${docId}`);
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<DeveloperBoardIcon />} endIcon={<ArrowForwardIosRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>Whiteboards</Typography></Button>
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
                                </Card>
                            );
                        })
                    }
                </Stack>
            </Container>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={handleNewWhiteboard} icon={<DashboardCustomizeOutlinedIcon />} tooltipTitle="New Whiteboard" sx={{ color: "black" }} />
            </SpeedDial>
        </Box>
    );
};

export default Whiteboards;