import React from "react";
import logo_IntusCare from "/logo_IntusCare.svg";
import "./index.css";

function NavHeader() {
  return (
    <nav className="navbar fixed-top">
      <a className="navbar-brand" href="/">
        <img
          src={logo_IntusCare}
          alt="Intus Care logo"
          className="navbar-logo"
        />
      </a>
    </nav>
  );
}

export default NavHeader;
