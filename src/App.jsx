import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

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

      <ToastContainer position="bottom-right" newestOnTop autoClose={2000} />
    </SocketContext.Provider>
  );
};

export default App;
