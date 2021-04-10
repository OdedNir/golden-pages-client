import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HeaderComponent from "./components/header-component";
import LandingComponent from "./components/landing/landing-component";
import CardsListComponent from "./components/cards-list/cards-list-component";

import "./app.scss";

const App = () => {
  return (
    <Router id="app">
      <HeaderComponent />
      <Switch>
        <Route exact={true} path="/">
          <LandingComponent />
        </Route>

        <Route path="/professionals">
          <CardsListComponent />
        </Route>

        <Route path="/businesses">
          <CardsListComponent />
        </Route>

        <Route path="/services">
          <CardsListComponent />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
