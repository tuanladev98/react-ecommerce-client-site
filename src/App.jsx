import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import StripePayment from './pages/StripePayment';
import OrderHistory from './pages/OrderHistory';
import TrackingOrder from './pages/TrackingOrder';

import ChatWidget from './components/chat/chat-widget/ChatWidget';

const App = () => {
  const CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <>
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
          <Route path="/payment/:orderCode">
            {!CURRENT_USER ? <Redirect to="/login" /> : <StripePayment />}
          </Route>
          <Route path="/order-history">
            {!CURRENT_USER ? <Redirect to="/login" /> : <OrderHistory />}
          </Route>
          <Route path="/tracking-order">
            {!CURRENT_USER ? <Redirect to="/login" /> : <TrackingOrder />}
          </Route>
          <Route path="/login">
            {CURRENT_USER ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {CURRENT_USER ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
      {CURRENT_USER && <ChatWidget />}
    </>
  );
};

export default App;
