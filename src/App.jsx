import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PersonalProfileStep from './pages/PersonalProfileStep';
import FavoriteSongsStep from './pages/FavoriteSongsStep';
import PaymentStep from './pages/PaymentStep';
import SuccessStep from './pages/SuccessStep';
import HomePage from './pages/HomePage';
import OnboardingLayout from './components/OnboardingLayout';
import {
  GuestRoute,
  OnboardingRoute,
  HomeRoute,
} from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/onboarding"
          element={
            <OnboardingRoute>
              <OnboardingLayout />
            </OnboardingRoute>
          }
        >
          <Route path="step/1" element={<PersonalProfileStep />} />
          <Route path="step/2" element={<FavoriteSongsStep />} />
          <Route path="step/3" element={<PaymentStep />} />
          <Route path="step/4" element={<SuccessStep />} />
        </Route>

        <Route
          path="/home"
          element={
            <HomeRoute>
              <HomePage />
            </HomeRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
