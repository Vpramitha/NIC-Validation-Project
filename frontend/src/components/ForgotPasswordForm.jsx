import { useState } from "react";
import { Link } from "react-router-dom";
import {createOTP} from '../api/authService.js';
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await createOTP(email);

    setMessage(data.message);
    setError("");

    // move to OTP page with email
    navigate("/verify-otp", { state: { email } });

  } catch (err) {
    setError(err.message || "OTP creation failed");
  }
};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <p className="subtitle">Enter your email to reset your password</p>

      {error && <p className="error">{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="input-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-btn">
        Send OTP
      </button>

      <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}