import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Customize from './components/Customize';
import Admin from './components/Admin';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" component={Customize} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/checkout" component={Checkout} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
