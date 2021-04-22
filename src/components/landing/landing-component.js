import React from "react";
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import "./landing-component.scss";

const LandingComponent = () => {
  return (
    <div id="landing-component">
      <div className="header">
        Welcome to the <span className="gold">Golden Pages</span> Website!
      </div>
      <div className="header">
        Feel free to navigate using the{" "}
        <IconButton>
          <Menu />
        </IconButton>{" "}
        above.
      </div>
    </div>
  );
};

export default LandingComponent;
