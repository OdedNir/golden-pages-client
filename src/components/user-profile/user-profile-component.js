import { Button, makeStyles, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

import "./user-profile-component.scss";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 24,
  },
  attrName: {
    color: "#757575",
    fontSize: 18,
    fontWeight: 200,
  },
  attrValue: {
    fontSize: 32,
    fontWeight: 500,
  },
}));

const UserProfileComponent = (props) => {
  const { user, setUser } = props;

  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    history.push("/");
  };

  return (
    <div id="user-profile-component">
      <Typography className={classes.header} variant="h2">
        User Profile
      </Typography>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Username"}</Typography>
        <Typography className={classes.attrValue}>{username}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"E-mail"}</Typography>
        <Typography className={classes.attrValue}>{email}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Space"}</Typography>
        <Typography className={classes.attrValue}>{space}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Role"}</Typography>
        <Typography className={classes.attrValue}>{role}</Typography>
      </div>

      <Button
        startIcon={<ExitToApp />}
        color="secondary"
        variant="contained"
        onClick={logout}
      >
        Log Out
      </Button>
    </div>
  );
};

export default UserProfileComponent;
