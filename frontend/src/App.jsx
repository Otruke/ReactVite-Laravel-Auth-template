import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/auth/Dashboard";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerified from "./pages/auth/EmailVerified";
import LandingPage from "./pages/landing-page/LandingPage";
import CheckEmail from "./pages/auth/CheckEmail";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import InvalidToken from "./pages/auth/InvalidToken";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/verication-success" element={<VerificationSuccess />} />
          <Route path="/invalid-token" element={<InvalidToken />} /> 
          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
