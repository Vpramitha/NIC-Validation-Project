import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authService";

export default function ResetPasswordForm() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const OTP = location.state?.finalOtp || null;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const data = await resetPassword(email,OTP, password);

      setMessage(data.message);
      setError("");

      // redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      setError(err.message || "Password reset failed");
      setMessage("");

    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <p className="subtitle">
        Enter a new password for <b>{email}</b>
      </p>

      {error && <p className="error">{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="input-group">
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-btn">
        Reset Password
      </button>
    </form>
  );
}