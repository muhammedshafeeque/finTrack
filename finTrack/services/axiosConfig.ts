import axios from 'axios';
import { Platform } from 'react-native';

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});
export default axiosInstance;
