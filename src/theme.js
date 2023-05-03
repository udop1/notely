import { createTheme } from "@mui/material";
import "./index.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

function getColour(colour) {
	return getComputedStyle(document.querySelector(":root")).getPropertyValue(colour);
}

const theme = createTheme({
	typography: {
		fontFamily: "Montserrat",
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: getColour("--green-200"),
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
						backgroundColor: getColour("--green-100"),

						"& .MuiListItemIcon-root": {
							color: getColour("--green-400"),
						},
						"& .MuiListItemText-root": {
							color: getColour("--green-400"),

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
				text: {
					color: getColour("--green-400"),

					"&:hover": {
						color: "#FFFFFF",
					},
				},
				contained: {
					backgroundColor: getColour("--green-400"),
					fontWeight: "bold",
					borderRadius: 50,
				},
				outlined: {
					color: getColour("--green-400"),
					borderColor: getColour("--green-400"),
					borderRadius: 50,

					"&:hover": {
						color: "#FFFFFF",
					},
				},

				root: {
					"&:hover": {
						backgroundColor: getColour("--green-400"),
						borderColor: getColour("--green-300"),
						boxShadow: "none",
					},
					"&:active": {
						backgroundColor: getColour("--green-400"),
						borderColor: getColour("--green-300"),
						boxShadow: "none",
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					"&:after": {
						borderColor: getColour("--green-300"),
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: getColour("--green-300"),
					},
				},
			},
		},
		MuiSpeedDial: {
			styleOverrides: {
				fab: {
					backgroundColor: getColour("--green-400"),

					"&:hover": {
						backgroundColor: getColour("--green-400"),
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					backgroundColor: getColour("--green-100"),
					color: getColour("--green-400"),
					borderRadius: 5,
				},
			},
		},
	},
});

export default theme;
