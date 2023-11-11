import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Customize from './components/Customize';
import Admin from './components/Admin';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Customize} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
