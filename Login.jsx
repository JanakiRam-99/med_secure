import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://medsecure-hccy.onrender.com/auth/login", {
        email,
        password
      });

      if (response.data.message === "Login successful") {
        const username = response.data.username; // Get the username from the response
        const userType = response.data.userType; // You may need to include this in your backend response
        const redirectPath = userType === 'doctor' ? '/ddashboard' : '/pdashboard';
        
        // Set cookies directly in the client if necessary (usually handled by the server)
        document.cookie = `username=${username}; path=/;`;

        setTimeout(() => {
          navigate(redirectPath);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <Link to="/" className="login-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
