import React from "react";
import "./App.css";
import UploadPage from "./Components/Upload/UploadPage";
import ManagePage from "./Components/Manage/ManagePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/manage">
          <ManagePage />
        </Route>
        <Route path="/">
          <UploadPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
