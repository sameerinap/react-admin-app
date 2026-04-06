import { useState } from 'react';
import './Login.css';

/**
 * Login Component
 * 
 * Purpose: Handles user authentication
 * - Maintains form state (email and password)
 * - Validates user input
 * - Simulates authentication (in real app, connects to backend API)
 * - Passes authentication status to parent component
 */
function Login({ onLogin }) {
  // State hooks for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * handleSubmit - Processes login form submission
   * Why:
   * 1. Prevents default form behavior (page reload)
   * 2. Validates email and password
   * 3. Simulates API call with loading state
   * 4. Calls parent callback with user data
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation: Check if fields are empty
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Simulate API call
    setIsLoading(true);
    
    // Simulate delay (in real app, this would be an API request)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo credentials for testing
    if (email === 'admin@react.com' && password === 'admin123') {
      setIsLoading(false);
      onLogin({ email, name: 'Admin User' });
    } else {
      setIsLoading(false);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="loginContainer">
      {/* Animated React Logo Section */}
      <div className="loginLogoSection">
        <div className="loginLogo">
          <svg className="reactLogo" viewBox="0 0 256 228" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* React Logo */}
            <circle cx="128" cy="114" r="20" fill="white" />
            <ellipse cx="128" cy="114" rx="70" ry="30" fill="none" stroke="white" strokeWidth="3" />
            <ellipse cx="128" cy="114" rx="70" ry="30" fill="none" stroke="white" strokeWidth="3" transform="rotate(60 128 114)" />
            <ellipse cx="128" cy="114" rx="70" ry="30" fill="none" stroke="white" strokeWidth="3" transform="rotate(120 128 114)" />
          </svg>
          <div className="logoRing logoRing1"></div>
          <div className="logoRing logoRing2"></div>
          <div className="logoRing logoRing3"></div>
        </div>
        <h2 className="logoTitle">React Admin</h2>
        <p className="logoSubtitle">Modern Management System</p>
      </div>

      {/* Login Card Section */}
      <div className="loginCard">
        <div className="loginHeader">
          <h1 className="loginTitle">Admin Portal</h1>
          <p className="loginSubtitle">Welcome to React Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="loginForm">
          {/* Email Input Field */}
          <div className="loginGroup">
            <label htmlFor="email" className="loginLabel">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@react.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              disabled={isLoading}
            />
          </div>

          {/* Password Input Field */}
          <div className="loginGroup">
            <label htmlFor="password" className="loginLabel">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              disabled={isLoading}
            />
          </div>

          {/* Error Message Display */}
          {error && <div className="loginError">{error}</div>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`loginButton ${isLoading ? 'loginButtonLoading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials Info */}
        {/* <div className="login__info">
          <p><strong>Demo Credentials:</strong></p>
          <p>📧 Email: <strong>admin@react.com</strong></p>
          <p>🔐 Password: <strong>admin123</strong></p>
          <p>💡 These are test credentials for demonstration purposes</p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
