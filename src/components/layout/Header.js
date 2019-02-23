import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark mb-3 py-0"
      style={{ background: "#607D8B" }}
    >
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home" />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Add" className="nav-link">
              <i className="fas fa-plus" />
              Add
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "Mojo"
};

export default Header;
