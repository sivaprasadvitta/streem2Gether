import { io } from 'socket.io-client';
import BASE_URL from './constant';

// Example: Create and export a singleton socket instance.
let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL); // BASE_URL should point to your backend URL (e.g., 'http://localhost:5000')
  }
  return socket;
};
