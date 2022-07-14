import { createPublicRequest } from './axios_client';

const sizeApis = {
  getAllSize: () => {
    const result = createPublicRequest().get('/size');

    return result;
  },
};

export default sizeApis;
