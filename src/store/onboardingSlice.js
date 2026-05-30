import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  isCompleted: false,
  personalProfile: {
    name: '',
    age: '',
    email: '',
    profilePicture: '',
  },
  favoriteSongs: [''],
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updatePersonalProfile: (state, action) => {
      state.personalProfile = { ...state.personalProfile, ...action.payload };
    },
    updateFavoriteSongs: (state, action) => {
      state.favoriteSongs = action.payload;
    },
    updatePaymentInfo: (state, action) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      state.currentStep = 4;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setCurrentStep,
  updatePersonalProfile,
  updateFavoriteSongs,
  updatePaymentInfo,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
