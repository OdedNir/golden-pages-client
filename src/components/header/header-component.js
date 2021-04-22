import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
} from "@material-ui/core";
import { Menu, AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ENTITIES_CONSTANTS from "../../constants/entities";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  listItem: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  mainHeader: {
    textTransform: "none",
  },
  actions: {
    marginLeft: "auto",
  },
  actionButton: {
    marginLeft: 4,
  },
  accountButton: {
    marginLeft: "auto",
  },
}));

const HeaderComponent = (props) => {
  const { user } = props;

  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const renderListItems = () => {
    return ENTITIES_CONSTANTS.map((ENTITY, index) => {
      return (
        <ListItem
          className={classes.listItem}
          component={Link}
          to={ENTITY.plural.toLowerCase()}
          key={index}
          button
        >
          <ListItemIcon>
            <ENTITY.Icon />
          </ListItemIcon>
          <ListItemText primary={ENTITY.plural} />
        </ListItem>
      );
    });
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <Menu />
          </IconButton>

          <Button component={Link} to={"/"} color="inherit">
            <Typography className={classes.mainHeader} variant="h6">
              Golden Pages
            </Typography>
          </Button>

          {user ? (
            <IconButton
              // component={Link}
              // to={"/signIn"}
              className={classes.accountButton}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <div className={classes.actions}>
              <Button
                className={classes.actionButton}
                component={Link}
                to={"/signIn"}
                color="inherit"
              >
                Sign In
              </Button>

              <Button
                className={classes.actionButton}
                component={Link}
                to={"/logIn"}
                color="inherit"
              >
                Log In
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={toggleDrawer}>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Typography variant="h6">Golden Pages Menu</Typography>
          </ListItem>
          <Divider />

          {renderListItems()}
        </List>
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
