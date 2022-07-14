import axios from 'axios';

const BASE_URL = 'http://localhost:4001/';

export const createPublicRequest = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const createPrivateRequest = () => {
  const TOKEN = JSON.parse(localStorage.getItem('currentUser'))?.accessToken;

  if (!TOKEN) {
    localStorage.clear();
    window.location.href = '/login';
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': TOKEN,
    },
  });
};
