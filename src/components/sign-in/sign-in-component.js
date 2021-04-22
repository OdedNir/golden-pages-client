import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";

import "./sign-in-component.scss";

const USER_ROLE = "PLAYER";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
  field: {
    width: "80%",
  },
}));

const SignInComponent = (props) => {
  const { setUser } = props;

  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const isEmailValid = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && re.test(email.toLowerCase());
  };

  const isUsernameValid = () => {
    return !!username;
  };

  const isInputsValid = () => {
    return isEmailValid() && isUsernameValid();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;

    if (!isEmailValid()) {
      document.getElementById("email").focus();
      return;
    }

    if (!isUsernameValid()) {
      document.getElementById("username").focus();
      return;
    }

    signIn();
  };

  const signIn = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/twins/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        role: USER_ROLE,
        username,
        avatar: username,
      }),
    });

    if (!!response) {
      const result = await response.json();
      if (result.error) {
        alert("User already exists!\nEnter different details!");
        return;
      }
      localStorage.setItem("user", JSON.stringify(result));
      setUser(result);
      history.push("/");
    }
  };

  return (
    <div id="sign-in-component">
      <div id="fields-wrapper">
        <Typography className={classes.title}>Create your account</Typography>

        <TextField
          className={classes.field}
          id="email"
          required
          label="Enter e-mail"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
        />

        <TextField
          className={classes.field}
          id="username"
          required
          label="Enter username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleKeyDown}
        />

        <Button
          disabled={!isInputsValid()}
          variant="contained"
          color="primary"
          onClick={signIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignInComponent;
