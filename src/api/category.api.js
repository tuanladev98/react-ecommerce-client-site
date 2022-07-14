import { createPublicRequest } from './axios_client';

const categoryApis = {
  getAllCategory: () => {
    const result = createPublicRequest().get('/category');

    return result;
  },
};

export default categoryApis;
