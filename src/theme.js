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
                    backgroundColor: "#D9D9D9",
                    color: "#000000"
                }
            }
        }
    }
});

export default theme;