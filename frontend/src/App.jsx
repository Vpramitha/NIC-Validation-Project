import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NICValidatorPage from "./pages/NICValidatorPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './ProtectedRoute';
import ReportsPage from './pages/ReportsPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute>
                                            <DashboardPage />
                                          </ProtectedRoute>} />
        <Route path='/file-uploader' element={<ProtectedRoute>
                                                  <NICValidatorPage />
                                              </ProtectedRoute>}/>
        <Route path='/reports' element={<ProtectedRoute>
                                              <ReportsPage/>
                                        </ProtectedRoute>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;