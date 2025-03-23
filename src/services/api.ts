import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const sendOtp = async (email: string) => {
  return await axios.post(`${API_URL}/send-otp`, {email});
};
