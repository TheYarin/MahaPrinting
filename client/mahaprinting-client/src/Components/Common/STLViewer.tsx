import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

// @ts-ignore
import OriginalSTLViewer from "stl-viewer";

const styles = createStyles({
    root: {},
});

interface STLViewerProps extends WithStyles<typeof styles> {
    stlFile: ArrayBuffer;
    height?: number;
    width?: number;
    [x: string]: any;
    theme: Theme;
}

class STLViewer extends Component<STLViewerProps> {
    render() {
        const { classes, stlFile, ...rest } = this.props;

        return (
            <OriginalSTLViewer
                model={stlFile}
                width={300}
                height={300}
                modelColor={this.props.theme.palette.primary.main}
                backgroundColor={grey[200]}
                rotate={true}
                orbitControls={true}
                rotationSpeeds={[0, 0.02, 0]}
                lights={[
                    [-200, 0, 100],
                    [100, -50, 100],
                    [100, 0, -100],
                    [0, 50, -50, -50],
                ]}
                {...rest}
            />
        );
    }
}

export default withStyles(styles, { withTheme: true })(STLViewer);
