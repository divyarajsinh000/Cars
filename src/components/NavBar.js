// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: for styling the navbar
import logo from '../assests/logo.jpg';
const Navbar = ({isLoggedIn, handleLogout }) => {
  return (
    <div className="dashboard-container">
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">VIP AUTOMATED VEHICLE FITNESS TESTING CENTER</span>
      </div>
      <nav>
      
        <Link to="/">Dashboard</Link>
        <Link to="/customerlist">Customer</Link>
        <Link to="/transactionlist">Transaction</Link> 
        <Link to="/report">Report</Link>
      </nav>
      {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )} </header></div>
  );
};

export default Navbar;
