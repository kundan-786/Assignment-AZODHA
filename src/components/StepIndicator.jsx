const STEPS = [
  { number: 1, label: 'Profile' },
  { number: 2, label: 'Songs' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Done' },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {STEPS.map((step) => (
        <div
          key={step.number}
          className={`step-item ${currentStep >= step.number ? 'active' : ''} ${
            currentStep === step.number ? 'current' : ''
          }`}
        >
          <span className="step-number">{step.number}</span>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
