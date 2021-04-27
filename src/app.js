import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import filter from "lodash/filter";

import HeaderComponent from "./components/header/header-component";
import LandingComponent from "./components/landing/landing-component";
import CardsListComponent from "./components/cards-list/cards-list-component";
import SignInComponent from "./components/sign-in/sign-in-component";
import LoginComponent from "./components/login/login-component";
import UserProfileComponent from "./components/user-profile/user-profile-component";

import "./app.scss";

const App = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const splitDataByType = (type) => {
    return filter(data, (item) => {
      return item.type === type;
    });
  };

  const getData = async () => {
    const { space, email } = user.userId;

    const response = await fetch(
      `${process.env.API_ENDPOINT}/twins/items/${space}/${email}`
    );

    const result = await response.json();

    result && setData(result);
  };

  useEffect(() => {
    user && getData();
  }, []);

  return (
    <Router id="app">
      <HeaderComponent user={user} />
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
          <SignInComponent setUser={setUser} />
        </Route>

        <Route path="/login">
          <LoginComponent setUser={setUser} />
        </Route>

        <Route path="/user">
          <UserProfileComponent user={user} setUser={setUser} />
        </Route>

        <Route path="/">
          <LandingComponent />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
