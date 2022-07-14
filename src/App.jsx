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

const App = () => {
  const CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'));

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
  );
};

export default App;
