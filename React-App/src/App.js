import React, {useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Customize from './components/Customize';
import Admin from './components/Admin';
import Test from './components/Test';
import Checkout from './components/Checkout';
import CheckoutContext from './context/checkout.context';
// import Client from 'shopify-buy';

function App() {

  const domain = "project-aphrodite.myshopify.com"
  const storefrontAccessToken = "a315d6f383a61800bf0af3e9dce49d4a"

  const [checkoutInfo, setCheckoutInfo] = useState({});

  // useEffect(() => {
  //   let tempWS;
  //   const initialize = async () => {
  //       let token = localStorage.getItem("token");
  //       if (!token){
  //           localStorage.setItem('token', '');
  //           token = '';
  //       }
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <CheckoutContext.Provider value={{checkoutInfo, setCheckoutInfo}}>
        <Routes>
          <Route exact path="/" Component={Customize} />
          <Route exact path="/admin" Component={Admin} />
          <Route exact path="/checkout" Component={Checkout} />
          <Route exact path="/test" Component={Test} />
        </Routes>
      </CheckoutContext.Provider>
    </BrowserRouter>
  );
}

export default App;
