import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
    interface PrintStateColors {
        printing?: string;
        operational?: string;
        error?: string;
        paused?: string;
        cancelled?: string;
        done?: string;
    }
    interface PaletteOptions {
        global: any;
        printState: PrintStateColors;
    }

    interface Palette {
        global: any;
        printState: PrintStateColors;
    }
}
