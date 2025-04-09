import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="head">
      <nav>
        <h1>Perfumey</h1>
        <ul>
          <li><Link to="/">Home</Link> |</li>
          <li><Link to="/users">Users</Link> |</li>
          <li><a href="#">About</a> |</li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
