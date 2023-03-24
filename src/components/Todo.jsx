import { Box, Button, Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { UserAuth } from "../context/AuthContext";

const Todo = () => {
    const { todo } = UserAuth();

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-UK', options);
    const split = today.split(" ");
    // Date info
    const stringify = split[0]+" "+split[1]+", "+split[2];

    function handleClick(){
        //Load Modal to add a task
    }

    return (
        <Box>
            <NavBar />

            <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <SpeedDialAction icon={<NoteAddOutlinedIcon />} tooltipTitle="New Note" sx={{ color: "black" }} onClick={handleClick}/>
            </SpeedDial>

            <Container>
                <div style={{ display:"flex", justifyContent: "flex-end"}}>
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
            {/*List Current TODO for today*/}
        </Container>

        </Box>
    );
};

export default Todo;