import axios from 'axios';

import {
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
} from './types';


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
