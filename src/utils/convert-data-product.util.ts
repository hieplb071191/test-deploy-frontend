export default function convertdataProduct (products: any[]) {
    let lstProduct =  products.map((item: any) => {
        const resData = {
            name: item.name,
            quantity: item.productDetails?.reduce((acc: number, cur: any) => {
                return acc += cur.quantity
            }, 0),
            price: item.productDetails.length ? 
                    item.productDetails[0].price : 0,
            listImage: item.productDetails.length ? item.productDetails.reduce((acc: string[], cur: any) => {
                return [...acc, ...cur.imageUrls]
            }, []) : [],
            imageHover: item.imageUrls[0]
        }
    
        return resData
    })
    return lstProduct
}