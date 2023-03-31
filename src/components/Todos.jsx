import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { UserAuth } from "../context/AuthContext";
import React from 'react';
import { Link } from "react-router-dom";

const Todos = () => {
    const { todos } = UserAuth();
    console.log(todos);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-UK', options);
    const split = today.split(" ");
    // Date info
    const stringify = split[0] + " " + split[1] + ", " + split[2];

    function handleClick() {
        //Load Modal to add a task

    }
    function dayToString(no) {
        if (no === 0) { return "Sunday" } else if (no === 1) { return "Monday" } else if (no === 2) { return "Tuesday" } else if (no === 3) { return "Wednesday" } else if (no === 4) { return "Thursday" } else if (no === 5) { return "Friday" } else if (no === 6) { return "Saturday" }
    }
    function fixMins(no) {
        if (no > 9) {
            return no;
        } else {
            var str = "0" + no;
            return str;
        }
    }

    function handleData(timestamp) {
        var str = timestamp.toDate();

        const dayNum = str.getDate(); //Makes it read the day, 1st, 2nd - 31st
        const dayStr = dayToString(str.getDay()); //Makes it ready monday, tuesday etc

        //Get the time
        const hours = str.getHours();
        const mins = fixMins(str.getMinutes());
        return hours + ":" + mins;
    }

    return (
        <Box>
            <NavBar />

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<NoteAddOutlinedIcon />} tooltipTitle="New Note" sx={{ color: "black" }} onClick={handleClick} />
            </SpeedDial>

            <Container>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button>Today</Button>
                    <Button>Week</Button>
                    <Button>Month</Button>
                </div>
                <Typography>Today</Typography>
                <Typography>{stringify}</Typography>

            </Container>

            <Container sx={{ mb: 2 }}>
                <Grid container columns={12} justifyItems="center">
                    <Grid item xs={6}>
                        <Button startIcon={<ListRoundedIcon />} sx={{ color: "black" }}><Typography variant="body1" sx={{ fontWeight: "700", color: "black" }}>To-DO</Typography></Button>
                    </Grid>
                </Grid>
            </Container>

            <Container>
                {todos.map((card) => {
                    return (
                        <Card key={card.id}>
                            <CardActionArea component={Link} to={`/todos/${card.id}`}>
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontWeight: "700", mb: 0.5 }}>{card.task_title}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{card.description}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "400", mb: 0.3 }}>{handleData(card.deadline)}</Typography>

                                    {/* <Typography variant="body" dangerouslySetInnerHTML={{ __html: note.content }}></Typography> */}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )

                })}
            </Container>
        </Box>
    );
};

export default Todos;