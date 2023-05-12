import { Alert, AlertTitle, Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, TextField, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Pomodoro = () => {
    const navigate = useNavigate();
    const { user, updateTimer, deleteTimer } = UserAuth();
    const { timerId } = useParams();
    const [timerData, setTimerData] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [workTime, setWorkTime] = useState(null);
    const [breakTime, setBreakTime] = useState(null);
    const [modalDelOpen, setModalDelOpen] = useState(false);
    const [modalTagOpen, setModalTagOpen] = useState(false);
    const [tagFields, setTagFields] = useState([]);
    const [saveRevision, setSaveRevision] = useState(0); //If used to update page info, data is updated before changed meaning always 0
    const [isSaving, setIsSaving] = useState(0); //When changed, update page info

    async function getData(userId) {
        const queryData = await getDoc(doc(db, "users", userId, "pomodoros", timerId));

        return queryData;
    }

    useEffect(() => {
        const userId = user && user.uid;
        // let detached = false;
        getData(userId)
            .then((timer) => {
                // if (detached) return;
                setTimerData(timer.data());
                setTitle(timer.data().title);
                setTagFields(timer.data().tags);
                setSaveRevision(timer.data().revisionNumber);
            })
            .catch((error) => {
                // if (detached) return;
                console.error("Failed to get user session data:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user && user.uid, isSaving]);

    const handleDelete = async (removeTimer) => {
        if (removeTimer === true) {
            await deleteTimer(timerId);
            navigate("/pomodoros");
        } else {
            setModalDelOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setSaveRevision((saveRevision) => saveRevision + 1);
            await updateTimer(timerId, title, workTime, breakTime, tagFields, saveRevision);
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

    if (!timerData) return <div>Loading...</div>;

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
                            <Typography variant="body2" color="text.secondary">{timerData.modifiedDate.toDate().toDateString()}, {timerData.modifiedDate.toDate().toLocaleTimeString('en-GB')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700" }}>Tags</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
                                {
                                    tagFields.map((tag) => {
                                        return (
                                            <Chip key={tag} size="small" label={tag} />
                                        );
                                    })
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>

                <Typography>Stuff here</Typography>
            </Box>

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => setModalDelOpen(true)} icon={<DeleteOutlinedIcon />} tooltipTitle="Delete Timer" sx={{ color: "black" }} />
                <SpeedDialAction onClick={() => setModalTagOpen(true)} icon={<LocalOfferOutlinedIcon />} tooltipTitle="Modify Tags" sx={{ color: "black" }} />
                <SpeedDialAction onClick={handleSubmit} icon={<SaveOutlinedIcon />} tooltipTitle="Save Timer" sx={{ color: "black" }} />
            </SpeedDial>

            <Dialog open={modalDelOpen} onClose={() => setModalDelOpen(false)} aria-labelledby="alert-delete-title" aria-describedby="alert-delete-description">
                <DialogContent>
                    <DialogContentText>
                        Delete this timer?
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
                        Add some tags to your timer here.
                    </DialogContentText>

                    {tagFields.map((tagValue, index) => (
                        <Stack key={index} direction="row" sx={{ mb: 1 }}>
                            <TextField required size="small" variant="standard" value={tagValue} onChange={(e) => handleTagChange(index, e.target.value)} />
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

export default Pomodoro;