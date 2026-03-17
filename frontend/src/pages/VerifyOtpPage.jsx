import VerifyOtpForm from '../components/VerifyOtpForm';
import '../styles/login.css';

export default function VerifyOtpPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <VerifyOtpForm />
      </div>
    </div>
  );
}