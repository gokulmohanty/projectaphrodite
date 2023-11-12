const getVariant = async(client, variantState) => {
    const products = await client.product.fetchAll();
    for(let product of products){
        if(product.title === variantState.silhouette){
            // Found Prodct, now find variant.
            for(let variant of product.variants){
                let title = variant.title.toLowerCase()
                if(title.contains(variantState.color) && title.contains(variantState.size) && title.contains(variantState.fabric)){
                    return variant
                }
            }
        }
    }

    return null
}

export default getVariant;