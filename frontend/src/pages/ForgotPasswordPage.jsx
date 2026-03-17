import ForgotPasswordForm from '../components/ForgotPasswordForm';
import '../styles/login.css';

export default function ForgotPasswordPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}