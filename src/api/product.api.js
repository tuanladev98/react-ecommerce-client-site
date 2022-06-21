import axiosClient from './axios_client';

const productApis = {
  filterProduct: (categoryIds, genders, sizeIds) => {
    const result = axiosClient.get('/product/filter', {
      params: {
        categoryIds,
        genders,
        sizeIds,
      },
    });

    return result;
  },
};

export default productApis;
