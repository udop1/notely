// Settings component - ADAM
// Imports
import { Alert, AlertTitle, Avatar, Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Snackbar, Stack, TextField, Toolbar, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, updatePassword } from "firebase/auth";

const Settings = () => {
    // Variables
    const { user, logout } = UserAuth();
    const [passwordModal, setPasswordModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [originalPass, setOriginalPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassConfirm, setNewPassConfirm] = useState('');
    const [successPassAlert, setSuccessPassAlert] = useState(false);

    const navigate = useNavigate();

    // When the user clicks the logout button, run the logout function
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (error) {
            console.log(error);
        }
    };

    // When the user wants to update their password, check that their new password matches the confirmation, then check that their original password matches too. This prevent unauthorised pass changing.
    const handlePassUpdate = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassConfirm !== newPass) {
            return setError('Passwords do not match');
        }

        reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, originalPass)).then(async () => {
            try {
                await updatePassword(user, newPass).then(() => {
                    setPasswordModal(false);
                    setSuccessPassAlert(true);
                }).catch((error) => {
                    console.log(error);
                    return setError(error.message);
                });
            } catch (error) {
                console.log(error);
                return setError(error.message);
            }
        }).catch((error) => {
            console.log(error);
            return setError("Incorrect password");
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleDeleteAccount = () => {
        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            console.log(error);
            return setError("Account deletion failed. Try logging back in.")
        });
    };

    // Wait for user data before loading page
    if (!user.displayName && !user.email && !user.photoURL) return <div>Loading...</div>;

    return (
        <Box className="desktop-navbar-container" sx={{ display: "flex" }}>
            <NavBar />
            <Box className="desktop-undernav-content" sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />

                <Container sx={{ "&&": { px: 5 } }}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-around", mb: 3 }}>
                                <Avatar alt={user && user.displayName} src={user && user.photoURL} sx={{ height: "100px", width: "100px" }} />
                                <Typography variant="h6" fontWeight="700">Edit Profile</Typography>
                            </Stack>

                            <Stack spacing={2}>
                                <TextField disabled label="Username" variant="standard" defaultValue={user.displayName}></TextField>
                                <TextField disabled label="Email" variant="standard" defaultValue={user.email} type="email"></TextField>
                                <Grid container columns={12} sx={{ alignItems: "center" }}>
                                    <Grid item xs={10}>
                                        <TextField disabled label="Password" variant="standard" defaultValue={"fakepassword"} type="password" sx={{ width: "100%" }}></TextField>
                                    </Grid>
                                    <Grid item xs={2} display="flex" sx={{ justifyContent: "flex-end" }}>
                                        <IconButton onClick={() => setPasswordModal(true)}><EditRoundedIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack id="desktop-settings-buttons" spacing={2} sx={{ mx: 20 }}>
                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
                        <Button variant="contained" onClick={() => setDeleteModal(true)} sx={{ backgroundColor: "#d32f2f", ":hover": { backgroundColor: "#7f1c1c" } }}>Delete Account</Button>
                    </Stack>
                </Container>
            </Box>

            <Dialog component="form" open={passwordModal} onSubmit={handlePassUpdate} fullWidth maxWidth="md" aria-labelledby="modal-add-title" aria-describedby="modal-add-description">
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
                    <Stack spacing={2}>
                        <TextField required variant="standard" label="Original Password" onChange={(e) => setOriginalPass(e.target.value)} type="password"></TextField>
                        <FormControl required variant="standard" onChange={(e) => setNewPass(e.target.value)} type="password">
                            <InputLabel>New Password</InputLabel>
                            <Input type={showPassword ? "text" : "password"} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            />
                        </FormControl>
                        <FormControl required variant="standard" onChange={(e) => setNewPassConfirm(e.target.value)} type="password">
                            <InputLabel>New Password Confirmation</InputLabel>
                            <Input type={showPassword ? "text" : "password"} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            />
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setPasswordModal(false)} autoFocus>Cancel</Button>
                    <Button type="submit" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={successPassAlert} autoHideDuration={6000} onClose={() => setSuccessPassAlert(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Password changed successfully!
                </Alert>
            </Snackbar>

            <Dialog component="form" open={deleteModal} onSubmit={handleDeleteAccount} fullWidth maxWidth="md" aria-labelledby="modal-add-title" aria-describedby="modal-add-description">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
                    Deleting your account will erase all your data. This cannot be recovered.
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteModal(false)} autoFocus>Cancel</Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#d32f2f" }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Settings;