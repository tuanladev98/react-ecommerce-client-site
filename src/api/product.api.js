import { createPrivateRequest, createPublicRequest } from './axios_client';

const productApis = {
  filterProduct: (categoryId, gender, sort, userId) => {
    return createPublicRequest().get('/product/filter', {
      params: {
        categoryId,
        gender,
        sort,
        userId,
      },
    });
  },

  getPopularProduct: (userId) => {
    return createPublicRequest().get('/product/popular', {
      params: { userId },
    });
  },

  getOne: (code) => {
    return createPublicRequest().get(`/product/find/${code}`);
  },

  toggleFavoriteStatus: (productId) => {
    return createPrivateRequest().put(`/product/toggle-favorite/${productId}`);
  },
};

export default productApis;
