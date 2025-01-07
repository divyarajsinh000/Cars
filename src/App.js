import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import CustomerForm from './components/CustomerForm';
import TransactionForm from './components/TransactionForm';
import Report from './components/Report';
import EditCustomerForm from './components/EditCustomerForm';
import Navbar from './components/NavBar';
import CustomerList from './components/CustomerList';
import TransactionList from './components/TransactionList';
import Footer from './components/Footer';
import LoginWithOTP from './components/Login';

function App() {

    // Check login status on component mount
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus) {
            setIsLoggedIn(true);
        }
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        setIsLoggedIn(false); // Set logged out status
        localStorage.removeItem('isLoggedIn'); // Optional: Remove from localStorage if using persistence
    };
    return (
        <Router>
            <div className="app-container">
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
                <div className="content-container">
                    <Routes>
                        {/* If not logged in, redirect to login page */}
                        <Route path="/" element={isLoggedIn ? <Navigate to="/Dashboard" /> : <LoginWithOTP setIsLoggedIn={setIsLoggedIn} />} />

                        {/* Restricted routes */}
                        <Route path="/customers/edit/:customerId" element={isLoggedIn ? <EditCustomerForm /> : <Navigate to="/" />} />
                        <Route path="/add-customer" element={isLoggedIn ? <CustomerForm /> : <Navigate to="/" />} />
                        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
                        <Route path="/add-transaction" element={isLoggedIn ? <TransactionForm /> : <Navigate to="/" />} />
                        <Route path="/customerlist" element={isLoggedIn ? <CustomerList /> : <Navigate to="/" />} />
                        <Route path="/transactionlist" element={isLoggedIn ? <TransactionList /> : <Navigate to="/" />} />
                        <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
