import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[400],
            dark: deepPurple[600],
            light: deepPurple[200],
        },
        secondary: {
            main: amber[700],
            dark: amber[800],
            light: amber[400],
        },
        global: {
            titleBar: {
                backgroundColor: deepPurple[400],
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
        MuiButton: {
            root: {
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "110%",
                fontStyle: "italic",
                letterSpacing: 2,
            },
            sizeSmall: {
                fontSize: "90%",
            },
        },
    },
});

export default theme;
