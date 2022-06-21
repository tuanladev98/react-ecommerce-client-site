import axiosClient from './axios_client';

const categoryApis = {
  getAllCategory: () => {
    const result = axiosClient.get('/category');

    return result;
  },
};

export default categoryApis;
