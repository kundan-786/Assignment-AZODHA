import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentStep,
  updatePersonalProfile,
} from '../store/onboardingSlice';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function PersonalProfileStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.onboarding.personalProfile);

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const handleChange = (field) => (e) => {
    dispatch(updatePersonalProfile({ [field]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updatePersonalProfile({ profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.age || !profile.email.trim()) {
      return;
    }
    dispatch(setCurrentStep(2));
    navigate('/onboarding/step/2');
  };

  const isValid =
    profile.name.trim() && profile.age && profile.email.trim();

  return (
    <div className="step-content">
      <h2 className="step-title">Personal Profile</h2>
      <p className="step-description">Tell us a bit about yourself</p>

      <form onSubmit={handleNext} className="form">
        <FormField
          label="Full Name"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange('name')}
          placeholder="John Doe"
        />
        <FormField
          label="Age"
          id="age"
          name="age"
          type="number"
          value={profile.age}
          onChange={handleChange('age')}
          placeholder="25"
        />
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange('email')}
          placeholder="john@example.com"
        />

        <div className="form-field">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {profile.profilePicture && (
            <img
              src={profile.profilePicture}
              alt="Profile preview"
              className="profile-preview"
            />
          )}
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" disabled={!isValid}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
