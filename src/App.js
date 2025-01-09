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
import EdittransactionForm from './components/EditTrasactionsForm';

function App() {

    // Check login status on component mount
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus) {
            setIsLoggedIn(true);
        }
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const handleLogout = () => {
        setIsLoggedIn(false); // Set logged out status
        localStorage.removeItem('isLoggedIn'); // Optional: Remove from localStorage if using persistence
    };
    const handleLogin = () => {
        setIsLoggedIn(true); // Set logged in status
        localStorage.setItem('isLoggedIn', 'true'); // Persist to localStorage
    };
    return (
        <Router>
            <div className="app-container">
                {/* <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> */}
                <div className="content-container">
                    <Routes>
                        {/* If not logged in, redirect to login page */}
                        <Route path="/" element={isLoggedIn ? <Navigate to="/Dashboard" /> : <LoginWithOTP setIsLoggedIn={handleLogin} />} />

                        {/* Restricted routes */}
                        <Route path="/customers/edit/:customerId" element={isLoggedIn ? <EditCustomerForm isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/transaction/edit/:transactionId" element={isLoggedIn ? <EdittransactionForm isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/add-customer" element={isLoggedIn ? <CustomerForm isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/add-transaction" element={isLoggedIn ? <TransactionForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/" />} />
                        <Route path="/customerlist" element={isLoggedIn ? <CustomerList isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/transactionlist" element={isLoggedIn ? <TransactionList isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                        <Route path="/report" element={isLoggedIn ? <Report isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <Navigate to="/" />} />
                    </Routes>
                </div>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
