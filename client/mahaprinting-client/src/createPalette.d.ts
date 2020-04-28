import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
    interface PaletteOptions {
        global?: any;
    }

    interface Palette {
        global?: any;
    }
}
