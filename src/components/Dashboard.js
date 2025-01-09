import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add custom styles here.
import * as XLSX from 'xlsx'; 
import ReactDOM from "react-dom";
import logo from '../assests/logo.jpg';

function Dashboard({ isLoggedIn, handleLogout }) {
    const [count, setCount] = useState([]);

   
    useEffect(() => {
        axios.get('https://exciting-art-production.up.railway.app/dashboard')
            .then((res) => {
                setCount(res.data);
            })
            .catch((err) => {
                console.error('Error fetching customer data:', err);
            });
    }, []);


    return (
        <div className="container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              {/* <img src="car-icon.png" alt="Car" class="logo-icon"> */}
              <span class="logo-text">Auto Mobile</span>
                </div>
            </div>
            <nav class="sidebar-nav">
                
                <a href="/Dashboard" class="sidebar-link">Dashboard</a>
                <a href="/customerlist" class="sidebar-link">Customer</a>
                <a href="/transactionlist" class="sidebar-link">Transaction</a>
                <a href="/report" class="sidebar-link">Reports</a>
            </nav>
        </div>
        <div className="main-content">
          <header className="top-nav">
            <h1 className="page-title">VIP AUTOMATED VEHICLE FITNESS TESTING CENTER</h1>
            <div className="user-info">
         
          
                {isLoggedIn && (
                <button className="user-details" onClick={handleLogout}>
              
  
            Logout
                </button>
            )}
        
            </div>
          </header>
          <main className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  {/* <img src="car-icon.png" class="stat-icon"> */}
                  <span className="stat-time">Customers</span>
                </div>
                <div className="stat-body">
                  {/* <p className="stat-label">Customers</p> */}
                  <p className="stat-value">{count.totalCustomers}</p>
                  {/* <p className="stat-trend">+2 from yesterday</p> */}
                </div>
                
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  {/* <img src="car-icon.png" class="stat-icon"> */}
                  <span className="stat-time">Cars</span>
                </div>
                <div className="stat-body">
                  {/* <p className="stat-label">Vehicles In Service</p> */}
                  <p className="stat-value">{count.totalCars}</p>
                  {/* <p className="stat-trend">+2 from yesterday</p> */}
                </div>
                
              </div>
            </div>
            
      
          
          </main>
        </div>
      </div>
      
    );
}

export default Dashboard;
