import ResetPasswordForm from '../components/ResetPasswordForm';
import '../styles/login.css';

export default function VerifyOtpPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <ResetPasswordForm />
      </div>
    </div>
  );
}