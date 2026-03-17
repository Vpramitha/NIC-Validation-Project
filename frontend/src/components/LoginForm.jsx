import { useState } from 'react';
import { loginUser } from '../api/authService.js';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>
      <p className="subtitle">Login to your account</p>

      {error && <p className="error">{error}</p>}

      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Forgot Password link */}
      <p style={{ textAlign: "right", marginTop: "5px", marginBottom: "15px", fontSize: "14px" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <button type="submit" className="login-btn">
        Login
      </button>

      {/* Register link */}
      <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}