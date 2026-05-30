import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StepIndicator from './StepIndicator';

export default function OnboardingLayout() {
  const currentStep = useSelector((state) => state.onboarding.currentStep);

  return (
    <div className="page onboarding-page">
      <div className="card onboarding-card">
        <h1 className="page-title">Onboarding</h1>
        <StepIndicator currentStep={currentStep} />
        <Outlet />
      </div>
    </div>
  );
}
