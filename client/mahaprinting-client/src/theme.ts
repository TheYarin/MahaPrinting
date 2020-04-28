import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[500],
            dark: lightBlue[700],
            light: lightBlue[200],
        },
        secondary: {
            main: red[600],
            dark: red[800],
            light: red[200],
        },
        global: {
            titleBar: {
                backgroundColor: lightBlue[300],
                color: "white",
            },
            titleBarText: {
                fontFamily: "monospace",
                fontWeight: "bold",
            },
        },
    },
});

export default theme;
