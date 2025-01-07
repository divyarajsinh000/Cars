import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CustomerForm.css';

function EditCustomerForm() {
    const { customerId } = useParams();  // Get customerId from the URL
    const [formData, setFormData] = useState({ CustomerName: '', MobileNo: '' });
    const navigate = useNavigate();

    // Fetch existing customer data when the page loads
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`https://exciting-art-production.up.railway.app/customers/${customerId}`);
                setFormData({
                    CustomerName: response.data.CustomerName,
                    MobileNo: response.data.MobileNo,
                });
            } catch (error) {
                console.error("Error fetching customer:", error);
                alert('Failed to fetch customer data');
            }
        };

        fetchCustomer();
    }, [customerId]);

    // Handle form submission to update the customer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/customers/${customerId}`, formData);
            alert('Customer updated successfully!');
            navigate('/customers'); // Navigate back to customer list page (or any other page)
        } catch (error) {
            console.error(error);
            alert('Failed to update customer.');
        }
    };

    return (
        <div className="customer-form-fullscreen">
            <button type="button" className="back-button" onClick={() => navigate(-1)}>
                ⬅ Back
            </button>
            <form onSubmit={handleSubmit} className="customer-form">
                <h2>Edit Customer</h2>
                <div className="form-group">
                    <label htmlFor="CustomerName">Customer Name</label>
                    <input
                        type="text"
                        id="CustomerName"
                        placeholder="Enter customer name"
                        value={formData.CustomerName}
                        onChange={(e) => setFormData({ ...formData, CustomerName: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="MobileNo">Mobile Number</label>
                    <input
                        type="text"
                        id="MobileNo"
                        placeholder="Enter mobile number"
                        value={formData.MobileNo}
                        onChange={(e) => setFormData({ ...formData, MobileNo: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Update Customer</button>
            </form>
        </div>
    );
}

export default EditCustomerForm;
