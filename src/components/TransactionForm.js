import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TransactionForm.css';

function TransactionForm() {
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

            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add New Transaction</h3>
                        <button className="close-btn" onClick={() => navigate('/transactionlist')}>
                            &times;
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="CustomerId">Select Customer</label>
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
                            </div>
                            <div className="form-group">
                                <label htmlFor="VehicleNo">Vehicle Number</label>
                                <input
                                    type="text"
                                    id="VehicleNo"
                                    placeholder="Enter vehicle number"
                                    value={formData.VehicleNo}
                                    onChange={(e) => setFormData({ ...formData, VehicleNo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Price">Price</label>
                                <input
                                    type="text"
                                    id="Price"
                                    placeholder="Enter Price"
                                    value={formData.Price}
                                    onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="VehicleType">VehicleType</label>
                                <input
                                    type="text"
                                    id="VehicleType"
                                    placeholder="Enter VehicleType"
                                    value={formData.VehicleType}
                                    onChange={(e) => setFormData({ ...formData, VehicleType: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="OperationDate">Operation Date</label>
                                <input
                                    type="date"
                                    id="OperationDate"
                                    value={formData.OperationDate}
                                    onChange={(e) => setFormData({ ...formData, OperationDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="save-btn">
                                Add Transaction
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate('/transactionlist')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        
        
        // <div className="transaction-form-fullscreen">
        //     <button type="button" className="back-button" onClick={() => navigate(-1)}>
        //         ⬅ Back
        //     </button>
        //     <form onSubmit={handleSubmit} className="transaction-form">
        //         <h2>Add New Transaction</h2>
        //         <div className="form-group">
        //             <label htmlFor="CustomerId">Select Customer</label>
        //             <select
        //                 id="CustomerId"
        //                 value={formData.CustomerId}
        //                 onChange={(e) => setFormData({ ...formData, CustomerId: e.target.value })}
        //                 required
        //             >
        //                 <option value="">Select Customer</option>
        //                 {customers.map((customer) => (
        //                     <option key={customer.CustomerId} value={customer.CustomerId}>
        //                         {customer.CustomerName}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="VehicleNo">Vehicle Number</label>
        //             <input
        //                 type="text"
        //                 id="VehicleNo"
        //                 placeholder="Enter vehicle number"
        //                 value={formData.VehicleNo}
        //                 onChange={(e) => setFormData({ ...formData, VehicleNo: e.target.value })}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="Price">Price</label>
        //             <input
        //                 type="text"
        //                 id="Price"
        //                 placeholder="Enter Price"
        //                 value={formData.Price}
        //                 onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="OperationDate">Operation Date</label>
        //             <input
        //                 type="date"
        //                 id="OperationDate"
        //                 value={formData.OperationDate}
        //                 onChange={(e) => setFormData({ ...formData, OperationDate: e.target.value })}
        //                 required
        //             />
        //         </div>
        //         <button type="submit" className="submit-button">
        //             Add Transaction
        //         </button>
        //     </form>
        // </div>
    );
}

export default TransactionForm;
