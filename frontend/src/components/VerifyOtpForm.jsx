import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/authService";

export default function VerifyOtpForm() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {
    setError("Enter the complete 6 digit OTP");
    return;
  }

  try {
    const data = await verifyOTP(email, finalOtp);

    console.log("Response:", data);

    setError("");

    // move to reset password page if OTP correct
    navigate("/reset-password", { state: { email,finalOtp } });

  } catch (err) {
    setError(err.message || "Invalid or expired OTP");
  }
};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>
      <p className="subtitle">
        Enter the 6 digit code sent to <b>{email}</b>
      </p>

      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            style={{
              width: "45px",
              height: "45px",
              textAlign: "center",
              fontSize: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
        ))}
      </div>

      <button type="submit" className="login-btn" style={{ marginTop: "20px" }}>
        Verify OTP
      </button>
    </form>
  );
}