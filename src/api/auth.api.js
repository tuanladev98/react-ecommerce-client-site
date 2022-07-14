import { createPublicRequest } from './axios_client';

const authApis = {
  login: (email, password) => {
    const result = createPublicRequest().post('/auth/login', {
      email,
      password,
    });

    return result;
  },
};

export default authApis;
