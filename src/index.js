// React setup - ADAM
// Imports
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import theme from "./theme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

// Get the root element from index.html and render react elements inside. Set the theme to be the new MUI theme
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>
);
