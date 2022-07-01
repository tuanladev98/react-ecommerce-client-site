import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
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
          {!currentUser ? <Redirect to="/login" /> : <Cart />}
        </Route>
        <Route path="/checkout">
          {!currentUser ? <Redirect to="/login" /> : <Checkout />}
        </Route>
        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {currentUser ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
