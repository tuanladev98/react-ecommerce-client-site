import { createPrivateRequest, createPublicRequest } from './axios_client';

const productApis = {
  filterProduct: (keyword, categoryId, gender, sort, userId) => {
    return createPublicRequest().get('/product/filter', {
      params: {
        keyword,
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

  reviewProduct: (data) => {
    return createPublicRequest().post('/product/review', data);
  },

  getReviews: (productId) => {
    return createPublicRequest().get('/product/review/' + productId);
  },
};

export default productApis;
