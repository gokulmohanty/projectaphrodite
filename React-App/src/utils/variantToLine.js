const variantToLine = async(checkout, variantId) => {
    for (let item of checkout.lineItems) {
        if(item.variant.id === variantId){
            return item.id
        }
    }
}

export default variantToLine;