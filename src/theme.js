import { createTheme } from "@mui/material";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

const theme = createTheme({
	typography: {
		fontFamily: "Montserrat",
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: "#DBE192",
					color: "#000000",
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
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
		MuiButton: {
			styleOverrides: {
				contained: {
					backgroundColor: "#5D6716",
					fontWeight: "bold",
					borderRadius: 50,
				},

				root: {
					"&:hover": {
						backgroundColor: "#5D6716",
						borderColor: "#A4AE4D",
						boxShadow: "none",
					},
					"&:active": {
						backgroundColor: "#5D6716",
						borderColor: "#A4AE4D",
						boxShadow: "none",
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					"&:after": {
						borderColor: "#A4AE4D",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: "#A4AE4D",
					},
				},
			},
		},
	},
});

export default theme;
