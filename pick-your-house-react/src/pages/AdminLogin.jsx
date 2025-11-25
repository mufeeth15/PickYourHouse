import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin-login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Clear form fields when component mounts (after logout)
    useEffect(() => {
        setEmail('');
        setPassword('');
        setError('');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simple validation (in production, this would be a real authentication)
        if (email === 'admin@pickyourhouse.com' && password === 'admin123') {
            setTimeout(() => {
                setIsLoading(false);
                navigate('/admin');
            }, 1000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                setError('Invalid email or password');
            }, 1000);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="login-card">
                <div className="login-header">
                    <h2>Admin Login</h2>
                    <p>Welcome back! Please login to your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <i className="las la-envelope"></i>
                            </span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <i className="las la-lock"></i>
                            </span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            'Login to Dashboard'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
