import React from "react";
import { Menu } from "@material-ui/icons";

import "./landing-component.scss";

const LandingComponent = () => {
  return (
    <div id="landing-component">
      <div className="header">
        Welcome to the <span className="gold">Golden Pages</span> Website!
      </div>
      <div className="header">
        Feel free to navigate using the <Menu /> above:
      </div>
    </div>
  );
};

export default LandingComponent;
