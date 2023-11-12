const createEmptyCart = async(client) => {
    const checkout = await client.checkout.create()
    console.log(checkout)
    localStorage.setItem('checkoutId', checkout.id);
    return checkout
}

export default createEmptyCart;