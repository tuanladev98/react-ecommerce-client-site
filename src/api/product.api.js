import axiosClient from './axios_client';

const productApis = {
  filterProduct: (categoryId, gender, sort) => {
    return axiosClient.get('/product', {
      params: {
        categoryId,
        gender,
        sort,
      },
    });
  },

  getPopularProduct: () => {
    return axiosClient.get('/product/popular');
  }
};

export default productApis;
