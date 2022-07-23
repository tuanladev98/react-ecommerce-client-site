import { createPrivateRequest } from './axios_client';

const chatApis = {
  getMessages: (userId) => {
    const result = createPrivateRequest().get(
      '/realtime/conversation/' + userId
    );

    return result;
  },
};

export default chatApis;
