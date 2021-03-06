import React, { Component } from "react";
import "./App.css";
import UploadPage from "./Components/Upload/UploadPage";
import ManagePage from "./Components/Manage/ManagePage";

import { Switch, Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { ServerConnector } from "./ServerAPI/ServerConnector";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { WithStyles, createStyles, withStyles, Theme } from "@material-ui/core";
import { Toolbar, Typography } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    appRoot: { backgroundColor: "whitesmoke", height: "100%", minHeight: "100vh" },
    appBar: { backgroundColor: theme.palette.global.appBarColor, color: "white", padding: "7px 12px" },
    appTitle: { fontWeight: "bold", fontFamily: "monospace", marginLeft: 15 },
    pageRoot: {},
  });

type Props = RouteComponentProps<{}> & WithStyles<typeof styles>;

@observer
class App extends Component<Props> {
  serverConnector?: ServerConnector;
  @observable initialized: boolean = false;

  async componentDidMount() {
    this.serverConnector = new ServerConnector("http://localhost/api");
    await this.serverConnector.initialize();

    this.initialized = true;
  }

  _returnHome = () => this.props.history.push("/");

  render() {
    if (this.initialized === false) return "";

    const { classes } = this.props;
    const currentPath = this.props.location.pathname;

    const castServerConnector = this.serverConnector as ServerConnector;

    return (
      <div className={classes.appRoot}>
        <Toolbar className={classes.appBar}>
          <Typography variant="h4" className={classes.appTitle} style={{ cursor: "pointer" }} onClick={this._returnHome}>
            MahaPrinting
          </Typography>
          <Typography variant="h5" className={classes.appTitle}>
            {`// ${currentPath !== "/" ? currentPath.split("/")[1] : "home"}`}
          </Typography>
        </Toolbar>
        <div className={classes.pageRoot}>
          <Switch>
            <Route exact path="/">
              <UploadPage serverConnector={castServerConnector} />
            </Route>
            <Route path="/manage">
              <ManagePage serverConnector={castServerConnector} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
