import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerForm.css';

function CustomerForm() {
    const [formData, setFormData] = useState({ CustomerName: '', MobileNo: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://exciting-art-production.up.railway.app/customers', formData);
            alert('Customer added successfully!');
            setFormData({ CustomerName: '', MobileNo: '' }); // Reset form
        } catch (error) {
            console.error(error);
            alert('Failed to add customer.');
        }
    };

    return (
        <div className="modal-overlay">
    <div className="modal-content">
    <div className="modal-header">
    <h2>Add New Customer</h2>
                        <button className="close-btn" onClick={() => navigate(-1)}>
                            &times;
                        </button>
                    </div>
      
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="CustomerName">Customer Name</label>
                <input
                    type="text"
                    id="CustomerName"
                    placeholder="Enter customer name"
                    value={formData.CustomerName}
                    onChange={(e) =>
                        setFormData({ ...formData, CustomerName: e.target.value })
                    }
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
                    onChange={(e) =>
                        setFormData({ ...formData, MobileNo: e.target.value })
                    }
                    required
                />
            </div>
            {/* <button type="submit" className="submit-button">
                Add Customer
            </button> */}
            <div className="modal-footer">
                            <button type="submit" className="save-btn">
                                Add Transaction
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
        </form>
    </div>
</div>

    );
}

export default CustomerForm;
