import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add custom styles here.
import * as XLSX from 'xlsx'; 
import ReactDOM from "react-dom";
import logo from '../assests/logo.jpg';
function Dashboard() {
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
        <div className="dashboard-container">
        
            <main>
                <h1>Car Fitness Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-item">
                        <h2>Total Customers</h2>
                        <p>{count.totalCustomers}</p>
                    </div>
                    <div className="stat-item">
                        <h2>Total Transactions</h2>
                        <p>{count.totalCars}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
