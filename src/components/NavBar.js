import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../assests/logo.jpg";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className="dashboard-container">
      <header className="navbar">
        {/* Logo Section */}
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">
            VIP AUTOMATED VEHICLE FITNESS TESTING CENTER
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/customerlist" className="nav-link">
            Customer
          </Link>
          <Link to="/transactionlist" className="nav-link">
            Transaction
          </Link>
          <Link to="/report" className="nav-link">
            Report
          </Link>
        </nav>

        {/* Logout Button */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </header>
    </div>
  );
};

export default Navbar;
