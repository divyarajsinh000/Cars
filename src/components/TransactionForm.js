import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TransactionForm.css';

function TransactionForm({ isLoggedIn, handleLogout }) {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ CustomerId: '', VehicleNo: '', OperationDate: '',Price: '',VehicleType:'' });
    const navigate = useNavigate();
    
   
    useEffect(() => {
        axios
            .get('https://exciting-art-production.up.railway.app/customers')
            .then((res) => setCustomers(res.data))
            .catch((error) => console.error('Failed to fetch customers:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://exciting-art-production.up.railway.app/transactions', formData);
            alert('Transaction added successfully!');
            navigate('/transactionlist')
            setFormData({ CustomerId: '', VehicleNo: '', OperationDate: '',Price: '',VehicleType:'' }); // Reset form
        } catch (error) {
            console.error(error);
            alert('Failed to add transaction.');
        }
    };

    return (
        <><div class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
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
        </div><div className="main-content">
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
        
            
            {/* <div className="card"> */}
            <form onSubmit={handleSubmit} className="customer-form">
              <h2 className="text-white text-center text-2xl font-bold mb-4">Add New Transaction</h2>
            
               <label htmlFor="CustomerId" >Select Customer</label>
                                <select
                                    id="CustomerId"
                                    value={formData.CustomerId}
                                    onChange={(e) => setFormData({ ...formData, CustomerId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.CustomerId} value={customer.CustomerId}>
                                            {customer.CustomerName}
                                        </option>
                                    ))}
                                </select>
                            
                                <label htmlFor="VehicleNo">Vehicle Number</label>
                                <input
                                className="input-field"
                                    type="text"
                                    id="VehicleNo"
                                    placeholder="Enter vehicle number"
                                    value={formData.VehicleNo}
                                    onChange={(e) => setFormData({ ...formData, VehicleNo: e.target.value })}
                                    required />
                            
          
                                <label htmlFor="Price">Price</label>
                                <input
                                  className="input-field"
                                    type="text"
                                    id="Price"
                                    placeholder="Enter Price"
                                    value={formData.Price}
                                    onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                                    required />
                 
                           
                                <label htmlFor="VehicleType">VehicleType</label>
                                <input
                                  className="input-field"
                                    type="text"
                                    id="VehicleType"
                                    placeholder="Enter VehicleType"
                                    value={formData.VehicleType}
                                    onChange={(e) => setFormData({ ...formData, VehicleType: e.target.value })}
                                    required />
                          
                          
                                <label htmlFor="OperationDate">Operation Date</label>
                                <input
                                    type="date"
                                    id="OperationDate"
                                    value={formData.OperationDate}
                                    onChange={(e) => setFormData({ ...formData, OperationDate: e.target.value })}
                                    required />
                        
              <button className="btn" type="submit" >Submit</button>
            {/* </div> */}
            </form>
           
      
          
          </main>
                </div>
               </>
        
    );
}

export default TransactionForm;
