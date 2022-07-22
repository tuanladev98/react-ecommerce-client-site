import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatBot from 'react-simple-chatbot';

import 'react-toastify/dist/ReactToastify.css';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ChatWidget from './components/ChatWidget';

import { socket, SocketContext } from './socket/socketContext';

const App = () => {
  const CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/product/:code">
            <ProductDetail />
          </Route>
          <Route path="/cart">
            {!CURRENT_USER ? <Redirect to="/login" /> : <Cart />}
          </Route>
          <Route path="/checkout">
            {!CURRENT_USER ? <Redirect to="/login" /> : <Checkout />}
          </Route>
          <Route path="/login">
            {CURRENT_USER ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {CURRENT_USER ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>

      {CURRENT_USER && (
        <>
          {/* <ChatWidget /> */}
          <ChatBot
            steps={[
              {
                id: '0',
                message: 'Welcome to react chatbot!',
                trigger: '1',
              },
              {
                id: '1',
                message: 'Bye!',
                end: true,
              },
            ]}
          />
        </>
      )}

      <ToastContainer position="bottom-right" newestOnTop autoClose={2000} />
    </SocketContext.Provider>
  );
};

export default App;
