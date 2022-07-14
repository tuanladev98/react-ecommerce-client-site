import { createPublicRequest } from './axios_client';

const productApis = {
  filterProduct: (categoryId, gender, sort) => {
    return createPublicRequest().get('/product/filter', {
      params: {
        categoryId,
        gender,
        sort,
      },
    });
  },

  getPopularProduct: () => {
    return createPublicRequest().get('/product/popular');
  },

  getOne: (code) => {
    return createPublicRequest().get(`/product/find/${code}`);
  },
};

export default productApis;
