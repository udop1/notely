// Homepage component - ADAM
// Imports
import { Avatar, Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import React from 'react';
import Header from "./Header";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <Box>
            <Header />

            <Box id="homepage-upper-banner-container" sx={{ mt: -3, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <img id="homepage-upper-banner" src="./DesktopLandingBannerOrange.svg" alt="Desktop Landing Banner" style={{ display: "block", width: "100%" }}></img>
                <Container id="homepage-upper-text-container" sx={{ flexGrow: 1, position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <Box sx={{ gridColumnStart: 2, mr: 4 }}>
                        <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>Hi there! Welcome to Notely</Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}><span style={{ fontWeight: 700 }}>Notely</span> is an all-in-one productivity application designed for students by students.</Typography>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" component={Link} to="/signup" sx={{ "&&": { py: 1.25, width: "300px" } }}>Sign up for free</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box className="homepage-text-containers" sx={{ width: "75%" }}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>The <span style={{ color: "var(--green-400)" }}>simple</span> solution to productivity</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>The app offers a range of features that assist students and professionals in managing their daily tasks and activities effectively.</Typography>
                </Box>
                <Box id="homepage-function-container">
                    <Stack direction="row" spacing={2} sx={{ textAlign: "left", display: 'flex', flexWrap: 'nowrap' }}>
                        <Card className="homepage-function-icons" sx={{ flex: 1 }}>
                            <CardContent>
                                <img src="./IconTodo.svg" alt="Todo Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                <Typography variant="body1" sx={{ fontWeight: "700" }}>To-do lists</Typography>
                                <Typography variant="body2">Plan ahead with a to-do list.</Typography>
                            </CardContent>
                        </Card>
                        <Card className="homepage-function-icons" sx={{ flex: 1 }}>
                            <CardContent>
                                <img src="./IconNotes.svg" alt="Notes Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                <Typography variant="body1" sx={{ fontWeight: "700" }}>Notes</Typography>
                                <Typography variant="body2">Capture thoughts on the go.</Typography>
                            </CardContent>
                        </Card>
                        <Card className="homepage-function-icons" sx={{ flex: 1 }}>
                            <CardContent>
                                <img src="./IconWhiteboard.svg" alt="Whiteboard Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                <Typography variant="body1" sx={{ fontWeight: "700" }}>Whiteboards</Typography>
                                <Typography variant="body2">Visualise ideas with a digital whiteboard.</Typography>
                            </CardContent>
                        </Card>
                        <Card className="homepage-function-icons" sx={{ flex: 1 }}>
                            <CardContent>
                                <img src="./IconFlashcard.svg" alt="Flashcard Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                <Typography variant="body1" sx={{ fontWeight: "700" }}>Flashcards</Typography>
                                <Typography variant="body2">Master any subject with flashcards.</Typography>
                            </CardContent>
                        </Card>
                        <Card className="homepage-function-icons" sx={{ flex: 1 }}>
                            <CardContent>
                                <img src="./IconPomodoro.svg" alt="Pomodoro Icon" loading="lazy" style={{ minHeight: 40, marginBottom: 8, fontSize: 50 }} />
                                <Typography variant="body1" sx={{ fontWeight: "700" }}>Pomodoro Timer</Typography>
                                <Typography variant="body2">Stay focused with a Pomodoro timer.</Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Box>
                <Box id="homepage-function-scroll" sx={{ display: "none", ml: "auto" }}>
                    <Typography variant="body1" fontWeight="700" sx={{ mr: 1 }}>Swipe for more</Typography>
                    <img src="./IconArrow.svg" alt="Arrow"></img>
                </Box>
            </Container>
            <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box className="homepage-text-containers" sx={{ width: "75%" }}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>Available on <span style={{ color: "var(--green-400)" }}>all</span> platforms</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>Whether you're on your desktop, tablet, or smartphone, this app will work seamlessly across all devices.</Typography>
                </Box>
                <Stack direction="row" spacing={16} sx={{ alignItems: "center" }}>
                    <Box className="homepage-computing-icons">
                        <img src="./IconDesktop.svg" alt="Desktop" style={{ display: "block", objectFit: "contain", height: "150px" }} />
                        <Typography variant="h6" sx={{ mt: 4 }}>Desktop</Typography>
                    </Box>
                    <Box className="homepage-computing-icons">
                        <img src="./IconTablet.svg" alt="Tablet" style={{ display: "block", objectFit: "contain", height: "150px" }} />
                        <Typography variant="h6" sx={{ mt: 4 }}>Tablet</Typography>
                    </Box>
                    <Box className="homepage-computing-icons">
                        <img src="./IconMobile.svg" alt="Phone" style={{ display: "block", objectFit: "contain", height: "150px" }} />
                        <Typography variant="h6" sx={{ mt: 4 }}>Phone</Typography>
                    </Box>
                </Stack>
            </Container>
            <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box className="homepage-text-containers" sx={{ width: "75%" }}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>Created by fellow students</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>Our team is Appsolut. We are final-year Computing Technologies students at the University of Gloucestershire.</Typography>
                </Box>
                <Stack id="homepage-credits-container" direction="row" spacing={2}>
                    <Card className="homepage-credits-cards" sx={{ flex: 1, px: 3, py: 1 }}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Avatar src="./AvatarAdam.png" alt="Adam Taylor" sx={{ height: 128, width: 128 }} />
                                <Stack direction="column" sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                                    <Typography fontWeight="700" sx={{ color: "var(--green-400)" }}>Adam Taylor</Typography>
                                    <Typography fontWeight="700" sx={{ mt: 2, mb: 1 }}>App Developer</Typography>
                                    <Typography>s1903068@glos.ac.uk</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card className="homepage-credits-cards" sx={{ flex: 1, px: 3, py: 1 }}>
                        <CardContent>
                            <Stack direction="row" spacing={3} sx={{ flexDirection: "row-reverse" }}>
                                <Avatar src="./AvatarLinh.png" alt="Linh Ta" sx={{ height: 128, width: 128, ml: 3 }} />
                                <Stack className="homepage-credits-text-stack" direction="column" sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                    <Typography fontWeight="700" sx={{ color: "var(--green-400)" }}>Linh Ta</Typography>
                                    <Typography fontWeight="700" sx={{ mt: 2, mb: 1 }}>UX/UI Designer</Typography>
                                    <Typography>linhhata2001@gmail.com</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
            <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box className="homepage-text-containers" sx={{ width: "75%" }}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>Watch our trailer to find out more</Typography>
                </Box>
                <video width="100%" height="100%" controls style={{ maxWidth: "960", maxHeight: "540" }}>
                    <source src="./trailer.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Container>
            <Box id="homepage-lower-banner-container" sx={{ mt: 6, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <img id="homepage-lower-banner" src="./DesktopLandingBannerGreen.svg" alt="Desktop Landing Banner" style={{ display: "block", width: "100%" }}></img>
                <Container id="homepage-lower-text-container" sx={{ flexGrow: 1, position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <Box id="homepage-lower-text-box" sx={{ gridColumnStart: 1, ml: 8, width: "inherit" }}>
                        <Typography variant="h5" fontWeight="700" sx={{ mb: 1, color: "white" }}>Get started for free</Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: "white" }}>What are you waiting for? Sign up to get productive with us now!</Typography>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" component={Link} to="/signup" sx={{ "&&": { py: 1.25, width: "300px", backgroundColor: "white", color: "var(--green-400)" } }}>Sign up for free</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box sx={{ backgroundColor: "var(--green-200)", textAlign: "center", py: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--green-400)" }}>© 2023 Appsolut</Typography>
            </Box>
        </Box>
    );
};

export default Homepage;