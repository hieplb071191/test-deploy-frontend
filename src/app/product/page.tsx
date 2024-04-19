'use client'

import { get } from "@/api/api-service"
import CartItem from "@/components/cart/cartItem"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import TuneIcon from '@mui/icons-material/Tune';
import convertdataProduct from "@/utils/convert-data-product.util"
import useClickOutside from "@/hooks/useClickOutSide"
import style from '@/style/product-page.module.scss'
import clsx from 'clsx'
import { ProductFilter } from "@/components/product/product-filter"
import ClearIcon from '@mui/icons-material/Clear';
import ProductSort from "@/components/product/product-sort"


export default function Production() {

    const router = useRouter()
    const query = useSelector((state: RootState) => state.productQuery.query)

    const token = useSelector((state: RootState) => state.token.token)
    const [products, setProducts] = useState<any[]>([])
    const [showFilter, setShowfilter] = useState<boolean>(false)

    const getProduct = async (query: Record<string, any>) => {
        try {
            const result = await get('product-public/product',query, token)
            if (result.data?.rows?.length) {
                setProducts(prev => {
                    return convertdataProduct(result.data.rows)
                })
            } else {
                setProducts([])
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    useEffect(() => {
        getProduct(query).then(res => console.log(res)).catch((e) =>console.log(e))
    }, [query])
    
    const filterRef = useRef(null)


    useClickOutside(filterRef, (event: any) => {
        const parentNode = event.target.parentNode
        const nodeData = event.target
        if (parentNode?.id !== 'click-togger-product-filter' && nodeData?.id !== 'click-togger-product-filter' ) {
            setShowfilter(false)
        }
    })
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
                <div className="sx:hidden lg:flex xl:flex lg:container  justify-between items-center my-5 mx-auto">
                    <span className="font-normal text-gray-500 text-base cursor-pointer" 
                        onClick={(event) => {
                            event.preventDefault()
                            setShowfilter(!showFilter)
                        }}
                        id='click-togger-product-filter'
                    >
                        <TuneIcon className="text-sm text-gray-500"/> Bộ lọc 
            
                    </span>
                    <span className="text-2xl font-bold font-sans text-gray-500">
                        Sản phẩm
                    </span>
                    <span>
                       <ProductSort />
                    </span>
                </div>
                <div className="sx:flex lg:hidden flex-col items-center">
                    <span className="text-2xl font-bold font-sans text-gray-500">
                        Sản phẩm
                    </span>
                    <div className="flex justify-between w-full p-4">
                        <span className="font-normal text-gray-500 text-base cursor-pointer" 
                            onClick={(event) => {
                                event.preventDefault()
                                setShowfilter(!showFilter)
                            }}
                            id='click-togger-product-filter'
                        >
                            <TuneIcon className="text-sm text-gray-500"/> Bộ lọc 
                
                        </span>
                        <span>
                            <ProductSort />
                        </span>
                    </div>
                </div>
                <div className="grid sx:grid-cols-1 2sx:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-4 mb-4">
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
            <div className={clsx(
                    "min-h-lvh max-h-screen bg-white z-50  overflow-auto",
                    showFilter ? style['menu-annimation'] : style['hidden-menu-annimation']
                )} 
                ref={filterRef} 

            >
                <div className="absolute top-5 right-5"
                    
                    onClick={() => setShowfilter(false)}>
                    <ClearIcon className="text-gray-500" />
                </div>
                <ProductFilter />
            </div>
        </section>
    )
}