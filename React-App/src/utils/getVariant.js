const getVariant = async(client, variantState) => {
    const products = await client.product.fetchAll();
    for(let product of products){
        if(product.title.toLowerCase() === variantState.silhouette.toLowerCase()){
            // Found Prodct, now find variant.
            for(let variant of product.variants){
                let title = variant.title.toLowerCase()
                if(title.contains(variantState.color.toLowerCase()) && title.contains(variantState.size.toLowerCase()) && title.contains(variantState.fabric.toLowerCase())){
                    return variant
                }
            }
        }
    }

    return null
}

export default getVariant;