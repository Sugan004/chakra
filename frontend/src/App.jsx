import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <h1>Perfumey</h1>
          <div>
            <Link to="/">Home</Link> | <Link to="/users">Users</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
