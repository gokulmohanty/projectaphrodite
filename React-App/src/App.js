import React, {useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Customize from './components/Customize';
import Admin from './components/Admin';
import Test from './components/Test';
import Checkout from './components/Checkout';
import CheckoutContext from './context/checkout.context';
import createEmptyCart from './utils/createEmptyCart';
import Client from 'shopify-buy';

// import './App.css';
import './tailwind.css'
import Model from './components/Model';

function App() {

  const domain = "project-aphrodite.myshopify.com"
  const storefrontAccessToken = "a315d6f383a61800bf0af3e9dce49d4a"

  const [checkoutState, setCheckoutState] = useState({
    client: undefined,
    checkout: undefined
  });

  useEffect(() => {
    const initialize = async () => {
      // Initializing a client to return content in the store's primary language
      const client = Client.buildClient({
        domain: domain,
        storefrontAccessToken: storefrontAccessToken
      });

      // Initializing a client to return translated content
      Client.buildClient({
        domain: domain,
        storefrontAccessToken: storefrontAccessToken,
        language: 'en-EN'
      });
      
      let checkoutId = localStorage.getItem("checkoutId");
      if (!checkoutId) {
        console.log("CheckoutId is empty. New cart created.")
        setCheckoutState({
          client,
          checkout: await createEmptyCart(client)
        })
      }
      else {
        console.log("CheckoutId is NOT empty.")
        const checkout = await client.checkout.fetch(checkoutId)
        if(!checkout){
          console.log("CheckoutId is expired. New cart created.")
          setCheckoutState({
            client,
            checkout: await createEmptyCart(client)
          })
        }
        else{
          console.log("CheckoutId is NOT expired. Information retrieved from API.")
          setCheckoutState({
            client,
            checkout
          })
        }
      }


      // setCheckoutState({
      //   client,
      //   checkout: await createEmptyCart(client)
      // })

    }

    initialize();
  }, []);

  return (
    <BrowserRouter>
      <CheckoutContext.Provider value={{checkoutState, setCheckoutState}}>
        <Routes>
          <Route exact path="/customize" Component={Customize} />
          <Route exact path="/admin" Component={Admin} />
          <Route exact path="/checkout" Component={Checkout} />
          <Route exact path="/model" Component={Model} />
          <Route exact path="/" Component={Test} />
        </Routes>
      </CheckoutContext.Provider>
    </BrowserRouter>
  );
}

export default App;
