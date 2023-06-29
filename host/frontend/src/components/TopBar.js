import React from "react";
import { Auth } from "./Auth";
import { NavLink } from "react-router-dom";

function TopBar() {
  return (
    <div className="TopBar">
      <NavLink className="nav-link" to="/">
        Free File Host
      </NavLink>
      <div className="AuthBar">
        <Auth />
      </div>
    </div>
  );
}

export { TopBar };
