import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

const LoginWithOTP = ({ setIsLoggedIn }) => {
    const [mobileNo, setMobileNo] = useState('');
    const [otpCode, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleRequestOtp = async () => {
        try {
            const response = await axios.post('https://exciting-art-production.up.railway.app/request-otp', { mobileNo });
            alert(response.data.message);
            setStep(2);
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('https://exciting-art-production.up.railway.app/verify-otp', { mobileNo, otpCode });
            alert(response.data.message);
            setIsLoggedIn(true);
            navigate('/Dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to verify OTP');
        }
    };

    return (
        <div className="login-container">
            {step === 1 ? (
                <div className="form-card">
                    <h2>Login with OTP</h2>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <button className="btn" onClick={handleRequestOtp}>Request OTP</button>
                </div>
            ) : (
                <div className="form-card">
                    <h2>Enter OTP</h2>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Enter OTP"
                        value={otpCode}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="btn" onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default LoginWithOTP;
