import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import filter from "lodash/filter";

import HeaderComponent from "./components/header/header-component";
import LandingComponent from "./components/landing/landing-component";
import CardsListComponent from "./components/cards-list/cards-list-component";
import SignInComponent from "./components/sign-in/sign-in-component";

import "./app.scss";

const App = () => {
  const [data, setData] = useState(null);

  const splitDataByType = (type) => {
    return filter(data, (item) => {
      return item.type === type;
    });
  };

  const getData = async () => {
    const response = await fetch(
      `${process.env.API_ENDPOINT}/twins/items/userSpace/userEmail`
    );

    const result = await response.json();

    result && setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router id="app">
      <HeaderComponent />
      <Switch>
        <Route path="/professionals">
          <CardsListComponent data={splitDataByType("Professional")} />
        </Route>

        <Route path="/businesses">
          <CardsListComponent data={splitDataByType("Business")} />
        </Route>

        <Route path="/services">
          <CardsListComponent data={splitDataByType("Service")} />
        </Route>

        <Route path="/signIn">
          <SignInComponent />
        </Route>

        <Route path="/">
          <LandingComponent />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
