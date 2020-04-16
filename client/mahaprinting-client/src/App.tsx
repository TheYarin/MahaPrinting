import React, { Component } from "react";
import "./App.css";
import UploadPage from "./Components/Upload/UploadPage";
import ManagePage from "./Components/Manage/ManagePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ServerConnector } from "./ServerAPI/ServerConnector";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export default class App extends Component {
  serverConnector?: ServerConnector;
  @observable initialized: boolean = false;

  async componentDidMount() {
    this.serverConnector = new ServerConnector("http://localhost:5000");
    await this.serverConnector.initialize();

    this.initialized = true;
  }

  render() {
    if (this.initialized === false) return "";

    const castServerConnector = this.serverConnector as ServerConnector;

    return (
      <Router>
        <Switch>
          <Route path="/manage">
            <ManagePage serverConnector={castServerConnector} />
          </Route>
          <Route path="/">
            <UploadPage serverConnector={castServerConnector} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
