import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentStep,
  updatePaymentInfo,
} from '../store/onboardingSlice';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function PaymentStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payment = useSelector((state) => state.onboarding.paymentInfo);

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const handleChange = (field) => (e) => {
    dispatch(updatePaymentInfo({ [field]: e.target.value }));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(2));
    navigate('/onboarding/step/2');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (
      !payment.cardNumber.trim() ||
      !payment.expiryDate.trim() ||
      !payment.cvv.trim()
    ) {
      return;
    }
    dispatch(setCurrentStep(4));
    navigate('/onboarding/step/4');
  };

  const isValid =
    payment.cardNumber.trim() &&
    payment.expiryDate.trim() &&
    payment.cvv.trim();

  return (
    <div className="step-content">
      <h2 className="step-title">Payment Information</h2>
      <p className="step-description">Enter your card details</p>

      <form onSubmit={handleNext} className="form">
        <FormField
          label="Card Number"
          id="cardNumber"
          name="cardNumber"
          value={payment.cardNumber}
          onChange={handleChange('cardNumber')}
          placeholder="1234 5678 9012 3456"
        />
        <div className="form-row">
          <FormField
            label="Expiry Date"
            id="expiryDate"
            name="expiryDate"
            value={payment.expiryDate}
            onChange={handleChange('expiryDate')}
            placeholder="MM/YY"
          />
          <FormField
            label="CVV"
            id="cvv"
            name="cvv"
            type="password"
            value={payment.cvv}
            onChange={handleChange('cvv')}
            placeholder="123"
          />
        </div>

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" disabled={!isValid}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
