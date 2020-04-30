import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[500],
            dark: deepPurple[700],
            light: deepPurple[200],
        },
        secondary: {
            main: amber[600],
            dark: amber[800],
            light: amber[300],
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
    overrides: {
        MuiStepLabel: {
            label: {
                fontFamily: "monospace",
                fontSize: "105%",
            },
            labelContainer: {
                marginTop: -8,
            },
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: undefined,
            },
        },
    },
});

export default theme;
