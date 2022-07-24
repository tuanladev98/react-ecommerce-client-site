import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import 'react-toastify/dist/ReactToastify.css';

import App from './App';

import { store } from './redux/store';
import { socket, SocketContext } from './socket/socketContext';

const stripePromise = loadStripe('pk_test_7NNNWiNgA5u480fNRgnv9C5T00LS6wLqUz');

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <Elements
        stripe={stripePromise}
        // options={{
        //   clientSecret:
        //     'pi_3LOkBbHIdAgqeIMI1GsKxBU4_secret_d7PkI9fU7gIbPvPH426koOiue',
        // }}
      >
        <App />
      </Elements>
      <ToastContainer position="bottom-right" newestOnTop autoClose={1500} />
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('root')
);
