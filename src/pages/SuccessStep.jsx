import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentStep,
  completeOnboarding,
} from '../store/onboardingSlice';
import Button from '../components/Button';

export default function SuccessStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  const handleGoHome = () => {
    dispatch(completeOnboarding());
    navigate('/home');
  };

  return (
    <div className="step-content success-content">
      <div className="success-icon">✓</div>
      <h2 className="step-title">Onboarding Complete!</h2>
      <p className="step-description">
        You have successfully completed all onboarding steps. Your information
        has been saved.
      </p>

      <div className="form-actions centered">
        <Button type="button" variant="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
