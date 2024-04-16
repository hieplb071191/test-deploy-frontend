'use client'

import { get } from "@/api/api-service"
import CartItem from "@/components/cart/cartItem"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TuneIcon from '@mui/icons-material/Tune';

export default function Production() {

    const router = useRouter()
    const query = useSelector((state: RootState) => state.productQuery.query)
    const [queryData, setQueryData] = useState(query)
    const token = useSelector((state: RootState) => state.token.token)
    const [products, setProducts] = useState<any[]>([])
    const [showFilter, setShofilter] = useState<boolean>(false)
    useEffect(() => {
        setQueryData(query)
    }, [query])

    const getProduct = async (query: Record<string, any>) => {
        try {
            const result = await get('product-public/product',query, token)
            if (result.data?.rows?.length) {
                setProducts(prev => {
                    let lstProduct =  result.data.rows.map((item: any) => {
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
                })
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    useEffect(() => {
        getProduct(queryData).then(res => console.log(res)).catch((e) =>console.log(e))
    }, [query])

    return (
        <section className="w-full">
            <div className="w-full h-9 bg-gray-200 px-3">
                <div className="xl:container flex justify-start items-center h-full mx-auto">
                    <span className="text-sm text-gray-700">
                        Trang chủ / danh mục/ sản phẩm
                    </span>
                </div>
            
            </div>
            <div className="w-full h-auto mb-6">
                <img src="https://file.hstatic.net/1000406172/collection/col3_05e1425980eb4115856379d068f125cb.jpg" alt="image_banner_product" />
            </div>
            <section className="sx:w-full xl:container mx-auto">
                <div className="sx:hidden xl:flex xl:container  justify-between items-center my-5 mx-auto">
                    <span className="font-normal text-gray-500 text-base cursor-pointer" onClick={() => setShofilter(!showFilter)}>
                    <TuneIcon className="text-sm text-gray-500"/> Bộ lọc 
                    </span>
                    <span className="text-2xl font-bold font-sans text-gray-500">
                        Sản phẩm
                    </span>
                    <span>
                        Sort
                    </span>
                </div>
                <div className="grid sx:grid-cols-2 xl:grid-cols-4 mt-4 mb-4">
                    {
                        products.map((item, index) => {
                            return (
                                <CartItem 
                                    listImage={item.listImage} 
                                    price={item.price} 
                                    id={item._id} 
                                    name={item.name} 
                                    imageHover={item.imageHover} 
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            </section>
            <div className="fixed top-0 left-0 w-72 max-h-screen bg-white z-50  overflow-auto ">
               

            </div>
        </section>
    )
}