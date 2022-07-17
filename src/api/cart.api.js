import { createPrivateRequest } from './axios_client';

const cartApis = {
  getCart: () => {
    const result = createPrivateRequest().get('/cart/get-cart');

    return result;
  },

  getCartDetail: () => {
    const result = createPrivateRequest().get('/cart/get-cart-detail');

    return result;
  },

  addItem: (productId, sizeId, quantity) => {
    const result = createPrivateRequest().post('/cart/add-item', {
      productId,
      sizeId,
      quantity,
    });

    return result;
  },

  updateItem: (productId, sizeId, quantity) => {
    const result = createPrivateRequest().put('/cart/update-item', {
      productId,
      sizeId,
      quantity,
    });

    return result;
  },

  deleteItem: (productId, sizeId) => {
    const result = createPrivateRequest().delete('/cart/delete-item', {
      data: { productId, sizeId },
    });

    return result;
  },
};

export default cartApis;
