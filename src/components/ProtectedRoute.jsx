import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function GuestRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCompleted = useSelector((state) => state.onboarding.isCompleted);
  const currentStep = useSelector((state) => state.onboarding.currentStep);

  if (isAuthenticated) {
    if (isCompleted) {
      return <Navigate to="/home" replace />;
    }
    return <Navigate to={`/onboarding/step/${currentStep}`} replace />;
  }

  return children;
}

export function OnboardingRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCompleted = useSelector((state) => state.onboarding.isCompleted);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isCompleted) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export function HomeRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCompleted = useSelector((state) => state.onboarding.isCompleted);
  const currentStep = useSelector((state) => state.onboarding.currentStep);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isCompleted) {
    return <Navigate to={`/onboarding/step/${currentStep}`} replace />;
  }

  return children;
}
