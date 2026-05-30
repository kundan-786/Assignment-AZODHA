import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginSuccess,
  VALID_USERNAME,
  VALID_PASSWORD,
} from '../store/authSlice';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.onboarding.currentStep);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      dispatch(loginSuccess({ username }));
      navigate(`/onboarding/step/${currentStep}`);
    } else {
      setError('Invalid username or password. Try user123 / password123');
    }
  };

  return (
    <div className="page login-page">
      <div className="card">
        <h1 className="page-title">Welcome Back</h1>
        <p className="page-subtitle">Sign in to continue onboarding</p>

        <form onSubmit={handleSubmit} className="form">
          <FormField
            label="Username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <FormField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {error && <p className="form-error">{error}</p>}

          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>

        <p className="hint">
          Demo credentials: <strong>user123</strong> / <strong>password123</strong>
        </p>
      </div>
    </div>
  );
}
