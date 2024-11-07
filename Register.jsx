import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    axios.post('https://medsecure-hccy.onrender.com/auth/signup', {
      username,
      email,
      password,
      userType,
    })
    .then((response) => {
      if (response.data.status) {
        const redirectPath = userType === 'doctor' ? '/ddashboard' : '/pdashboard';
        document.cookie = `username=${username}; path=/;`;
        setTimeout(() => {
          navigate(redirectPath);
        }, 3000);
      }
      console.log("User is registered");
    })
    .catch((err) => {
      console.log(err);
      setError("Registration failed. Please try again later.");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h3>Register here</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">Register as:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button className="btn-register" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="login-link">
          <p>Have an account? <Link to="/login">Click here to login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
