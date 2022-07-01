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
    const result = createPrivateRequest.post('/order/create', {
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
};

export default orderApis;
