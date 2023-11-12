import React from 'react';
import Client from 'shopify-buy';

const domain = "project-aphrodite.myshopify.com"
const storefrontAccessToken = "a315d6f383a61800bf0af3e9dce49d4a"

var variantId;
variantId = "gid://shopify/ProductVariant/4743735630264"
variantId = "gid://shopify/ProductVariant/47437356335414"


const Checkout = () => {

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

  const createEmptyCart = async() => {
    const checkout = await client.checkout.create()
    console.log(checkout)
    localStorage.setItem('checkoutId', checkout.id);
    return checkout.id
  }

  const cartInteraction = async(variantId, add) => {
    // Test code
    const products = await client.product.fetchAll();
    for (let i = 0; i < 2 + 1; i++){
      console.log(products[i])
    }


    var checkoutId = localStorage.getItem("checkoutId")
    if (checkoutId === null) {
      checkoutId = await createEmptyCart()
    }

    if (add) {
      var lineItemsToAdd = [
        {
          variantId: variantId,
          quantity: 1,
          //customAttributes: [{key: "MyKey", value: "MyValue"}]
        }
      ];
    }
    else {
      var lineItemIdsToRemove = [
        'gid://shopify/CheckoutLineItem/194677729198640?checkout=e3bd71f7248c806f33725a53e33931ef'
      ];
    }
    try {
      var checkout
      if (add) {
        checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
      }
      else {
        checkout = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove)
      }
      console.log("Checkout successfully executed.")
      console.log(checkout)
      // Check for errors
      if (checkout.userErrors.length > 0) {
        console.log("Errors!")
        return
      }
    }
    catch (err) {
      console.log("Error on Checkout")
      console.log(err.message)
      for(let error of JSON.parse(err.message)) {
        for(let field of error.field) {
          if(field === "checkoutId") {
            // This checkout is invalid, make a new one and try to checkout again
            await createEmptyCart()
            return await cartInteraction(variantId, add)
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="container">
            <div className="row">
                <div className="col s12 m8 l6 offset-m2 offset-l3">
                <div className="card grey darken-4">
                    <div className="card-content">
                    <span className="card-title">Support-A-Creator Application</span>
                    <div className="row">
                        <div className="col s12">
                        <button
                            className="
                            btn
                            waves-effect waves-light
                            blue
                            right
                            "
                            onClick={() => cartInteraction(variantId, true)}
                        >
                            Add To Cart
                            <i className="material-icons right"></i>
                        </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                        <button
                            className="
                            btn
                            waves-effect waves-light
                            blue
                            right
                            "
                            onClick={() => cartInteraction(variantId, false)}
                        >
                            Remove from Cart
                            <i className="material-icons right"></i>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Checkout;