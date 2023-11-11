import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Customize from './components/Customize';
import Admin from './components/Admin';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Customize} />
        <Route exact path="/admin" Component={Admin} />
        <Route exact path="/checkout" Component={Checkout} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
