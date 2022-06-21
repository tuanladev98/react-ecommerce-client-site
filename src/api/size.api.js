import axiosClient from './axios_client';

const sizeApis = {
  getAllSize: () => {
    const result = axiosClient.get('/size');

    return result;
  },
};

export default sizeApis;
