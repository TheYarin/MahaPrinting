import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
            dark: deepPurple[700],
            light: deepPurple[200],
        },
        secondary: {
            main: red[600],
            dark: red[800],
            light: red[200],
        },
        global: {
            titleBar: {
                backgroundColor: deepPurple[300],
                color: "white",
            },
            titleBarText: {
                fontFamily: "monospace",
                fontWeight: "bold",
            },
            appBarColor: deepPurple[500],
        },
        printState: {
            printing: "",
            operational: "",
            error: "",
            paused: "",
            cancelled: "",
            done: "",
        },
    },
});

export default theme;
