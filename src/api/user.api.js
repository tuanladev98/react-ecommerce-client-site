import { createPrivateRequest } from './axios_client';

const userApis = {
  addLog: (logType) => {
    const result = createPrivateRequest().post('/user/add-log', {
      logType,
    });

    return result;
  },
};

export default userApis;
