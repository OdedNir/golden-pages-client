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
} from "@material-ui/core";
import { Menu, Person, Business, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  menuHeader: {
    marginBottom: theme.spacing(2),
  },
  mainHeader: {
    textTransform: "none",
  },
}));

const HeaderComponent = () => {
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
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={toggleDrawer}>
        <List className={classes.list}>
          <ListItem className={classes.menuHeader}>
            <Typography variant="h6">Golden Pages Menu</Typography>
          </ListItem>

          <ListItem component={Link} to={"/professionals"} button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Professionals" />
          </ListItem>

          <ListItem component={Link} to={"/businesses"} button>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Businesses" />
          </ListItem>

          <ListItem component={Link} to={"/services"} button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
