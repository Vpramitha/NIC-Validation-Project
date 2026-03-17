import RegisterForm from '../components/RegisterForm';
import '../styles/login.css';

export default function RegisterPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <RegisterForm />
      </div>
    </div>
  );
}