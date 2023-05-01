import { createTheme } from "@mui/material";
import "@fontsource/montserrat/";

const theme = createTheme({
	typography: {
		fontFamily: "Montserrat",
	},
	components: {
		//NavBar
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					//Change default background and text colour
					backgroundColor: "#DBE192",
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
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#F2F5C8",

						"& .MuiListItemIcon-root": {
							color: "#5D6716",
						},
						"& .MuiListItemText-root": {
							color: "#5D6716",

							"& .MuiTypography-root": {
								fontWeight: "bold",
							},
						},
					},

					"& .MuiListItemIcon-root": {
						color: "#000000",
					},
					"& .MuiListItemText-root": {
						color: "#000000",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 15,
				},
			},
		},
	},
});

export default theme;
