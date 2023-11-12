import React, {useContext} from 'react';
import createEmptyCart from '../utils/createEmptyCart';
import CheckoutContext from '../context/checkout.context';
import variantToLine from '../utils/variantToLine';

var variantId;
variantId = "gid://shopify/ProductVariant/4743735630264"
variantId = "gid://shopify/ProductVariant/47437356335414"


const Checkout = () => {

  const {checkoutState, setCheckoutState} = useContext(CheckoutContext);

  const cartInteraction = async(variantId, add) => {
    // // Test code
    // const products = await checkoutState.client.product.fetchAll();
    // for (let i = 0; i < 2 + 1; i++){
    //   console.log(products[i])
    // }


    if (checkoutState.checkout.id === null) {
      setCheckoutState({
        client: checkoutState.client,
        checkout: await createEmptyCart(checkoutState.client)
      })
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
        await variantToLine(checkoutState.checkout, variantId)
      ];
    }
    try {
      var checkout
      if (add) {
        checkout = await checkoutState.client.checkout.addLineItems(checkoutState.checkout.id, lineItemsToAdd)
      }
      else {
        checkout = await checkoutState.client.checkout.removeLineItems(checkoutState.checkout.id, lineItemIdsToRemove)
      }
      console.log("Checkout successfully executed.")
      setCheckoutState({
        client: checkoutState.client,
        checkout
      })
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
            setCheckoutState({
              client: checkoutState.client,
              checkout: await createEmptyCart(checkoutState.client)
            })
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