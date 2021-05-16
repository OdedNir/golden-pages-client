import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

// import Avatars from "./sign-in-service";

import "./sign-in-component.scss";

const USER_ROLES = {
  PLAYER: "PLAYER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
};

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
  const [role, setRole] = useState(USER_ROLES.PLAYER);
  // const [avatar, setAvatar] = useState(Avatars.AVATAR1);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.value);
  // };

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
        role,
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

        <div className={classes.field}>
          <InputLabel shrink>Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            style={{ width: "100%" }}
          >
            <MenuItem value={USER_ROLES.PLAYER}>{USER_ROLES.PLAYER}</MenuItem>
            <MenuItem value={USER_ROLES.MANAGER}>{USER_ROLES.MANAGER}</MenuItem>
            <MenuItem value={USER_ROLES.ADMIN}>{USER_ROLES.ADMIN}</MenuItem>
          </Select>
        </div>

        {/* <div className={classes.field}>
          <InputLabel shrink>Avatar</InputLabel>
          <Select
            value={avatar}
            onChange={handleAvatarChange}
            style={{ width: "100%" }}
          >
            <MenuItem value={Avatars.Avatar1}>{Avatars.Avatar1}</MenuItem>
            <MenuItem value={Avatars.Avatar2}>{Avatars.Avatar2}</MenuItem>
            <MenuItem value={Avatars.Avatar3}>{Avatars.Avatar3}</MenuItem>
            <MenuItem value={Avatars.Avatar4}>{Avatars.Avatar4}</MenuItem>
            <MenuItem value={Avatars.Avatar5}>{Avatars.Avatar5}</MenuItem>
            <MenuItem value={Avatars.Avatar6}>{Avatars.Avatar6}</MenuItem>
          </Select>
        </div> */}

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
