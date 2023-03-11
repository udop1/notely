import { createTheme } from "@mui/material";
import "@fontsource/montserrat/";

const theme = createTheme({
	typography: {
		fontFamily: "Montserrat",
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					//Change default background and text colour
					backgroundColor: "#D9D9D9",
					color: "#000000",
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					//Change default icon colour
					color: "#000000",
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					//Change default text colour
					color: "#000000",
				},
			},
		},
	},
});

export default theme;
