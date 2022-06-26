import axios from 'axios';

const BASE_URL = 'http://localhost:4001/';

const CURRENT_USER = JSON.parse(
  !localStorage.getItem('persist:root')
    ? null
    : localStorage.getItem('persist:root')
)?.currentUser;

export const createPublicRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const createPrivateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': !CURRENT_USER
      ? null
      : JSON.parse(CURRENT_USER)?.accessToken,
  },
});
