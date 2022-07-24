import { createPrivateRequest } from './axios_client';

const orderApis = {
  createOrder: (
    receiver,
    address,
    phoneNumber,
    province,
    district,
    ward,
    postcode
  ) => {
    const result = createPrivateRequest().post('/order/create', {
      receiver,
      address,
      phoneNumber,
      province,
      district,
      ward,
      postcode,
    });

    return result;
  },

  getOrderDetail: (orderCode) => {
    const result = createPrivateRequest().get(
      '/order/order-detail/' + orderCode
    );

    return result;
  },

  getOrderHistory: () => {
    const result = createPrivateRequest().get('/order/order-history');

    return result;
  },

  createStripePaymentIntent: (amount) => {
    const result = createPrivateRequest().post(
      '/order/create-stripe-payment-intent',
      {
        amount,
        currency: 'vnd',
        paymentMethodType: 'card',
      }
    );

    return result;
  },

  updateOrderPayment: (orderCode, paymentIntentId) => {
    const result = createPrivateRequest().put(
      '/order/update-payment/' + orderCode,
      {
        paymentIntentId,
      }
    );

    return result;
  },
};

export default orderApis;
