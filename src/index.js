import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import App from './App';

import { store } from './redux/store';
import { socket, SocketContext } from './socket/socketContext';

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <App />
      <ToastContainer position="bottom-right" newestOnTop autoClose={1500} />
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('root')
);
