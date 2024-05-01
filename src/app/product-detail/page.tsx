'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { get, post } from "@/api/api-service"
import { toast } from "react-toastify"
import clsx from 'clsx'
import BannerCaurosel from "@/components/caurosel/banner-caurosel"
import CartQuantityItem from "@/components/input/cart-quantity-item"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import style from '@/style/product-detail.module.scss'
import ProductDetailPolicy from "@/components/product-detail/policy"
import { AxiosResponse } from "axios"
import { setCart } from "@/redux/slices/cart.slice"

export default function ProductDetail() {

    const searchParams = useSearchParams() 
    const [productId, setProductId] = useState<string | null>('')
    const [productData, setProductData ] = useState<any>({})
    const [productDetails, setProductDetails] = useState<any[]>([])
    const [displayProductDetail, setDisplayProductDetail] = useState<any>({})
    const [displayPrice, setDisplayPrice] = useState<number | null>(null)
    const [listColor, setListColor] = useState<string[]>([])
    const [listSize, setlistSize] = useState<string[]>([])
    const [currentParamDetail, setCurrentParamDetail] = useState<Record<string, string>>({})
    const token = useSelector((state: RootState) => state.token.token)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        setProductId(searchParams.get('productId'))
    }, [searchParams])

    useEffect(() => {
        if (productId) {
            get(`/product-public/get-one-product/${productId}`).then(res => {
                console.log('resData detail', res.data)
                setProductData(res.data)
                setProductDetails(prev => {
                    return res.data?.productDetails ? res.data?.productDetails : prev
                })
                setDisplayProductDetail((prev: any) => {
                    return res.data?.productDetails ? res.data?.productDetails[0] : prev
                })
                setCurrentParamDetail(prev => {
                    return {
                        color: res.data?.productDetails[0].color,
                        size: res.data?.productDetails[0].size,
                    }
                })
            }).catch(e => {
                toast.error(e.message)
            })
        }
        
    }, [productId])

    const handleSetParamDetail = (param: Record<string, string>) => {
        setCurrentParamDetail(prev => {
            return {
                ...prev,
                ...param
            }
        })
    }

    useEffect(() => {
        if (currentParamDetail.color && currentParamDetail.size) {
            get(`/product-public/product-detail-by-info/${productId}`, {
                size: currentParamDetail.size,
                color: currentParamDetail.color
            }).then(res => {
                if(res.data) {
                    setDisplayProductDetail(res.data)
                    setDisplayPrice(res.data.price)
                } else {
                    setDisplayPrice(null)
                    toast.error('productDetail not existed')
                }
  
            }).catch(e => {
                toast.error(e.message)
            })
        }
    }, [currentParamDetail, productId])

    useEffect(() => {
        if (displayProductDetail.price) {
            if (displayProductDetail.discount) {
                if (displayProductDetail.discount.discountType === 'percent') {
                    setDisplayPrice(prev => {
                        return displayProductDetail.price - (displayProductDetail.price * displayProductDetail.discount.discountValue) / 100
                    })
                } else {
                    setDisplayPrice(prev => {
                        return displayProductDetail.price - displayProductDetail.discount.discountValue
                    })
                }
            } else {
                setDisplayPrice(displayProductDetail.price)
            }
        }
        if (productDetails.length) {
            let listImages: any = productDetails.map(item => {
                return item.color
            })
            listImages = new Set(listImages)
            setListColor([...listImages])

            let listSizes: any = productDetails.map(item => {
                return item.size
            })
            listSizes = new Set(listSizes)
            setlistSize([...listSizes])
        }
    }, [displayProductDetail, productDetails])

    const formik = useFormik({
        initialValues: {
            quantity: 0
        },
        onSubmit: async (value) => {
            if (!token) {
                toast.error('please login!!!')
                router.replace('/login')
            }
            const {data} = (await get('/user-cart/cart', {}, token)) as AxiosResponse
            let cartItems= [
                ...data.items,
            ]

            const checkExistedITems = cartItems.filter(item => item.productDetailId === displayProductDetail._id)
            if (checkExistedITems.length) {
                const itemsNotExisted = cartItems.filter(item => item.productDetailId !== displayProductDetail._id)
                const [existedItems] =  checkExistedITems
                let updateData = [
                    ...itemsNotExisted,
                    {
                        ...existedItems,
                        quantity: value.quantity + existedItems.quantity > displayProductDetail.quantity ? displayProductDetail.quantity : value.quantity + existedItems.quantity
                    }
                ]
                cartItems = updateData
            } else {
                cartItems= [
                    ...data.items,
                    {
                        productName: productData.name,
                        productDetailId: displayProductDetail._id,
                        quantity: value.quantity,
                        price: displayPrice
                    }
                ]
            }
            const result = await post('/user-cart/create-cart', {items: cartItems}, token)
            dispatch(setCart(result.data))
        }
    })

    return (
        <section className="flex container mx-auto">
            <div className="sx:w-full xl:w-[1190px] flex sx:flex-col xl:flex-row justify-start gap-4 mx-auto">
                <ul className="w-[55%] sx:hidden xl:grid grid-cols-2 h-fit">
                    {
                        productData?.imageUrls?.length && productData.imageUrls.map((item: any, index: number) => {
                            return (
                                <li key={index} className="p-2 w-full h-96">
                                    <img src={item} alt={item} className="object-cover w-full h-full"/>
                                </li>        
                            )
                        })
                    }
                </ul>
                <div className="sx:flex xl:hidden">
                    <BannerCaurosel datas={productData?.imageUrls?.map((item: string) => ({image: item})) ?? []} propId={""} />
                </div>
                <div className="sx:w-full xl:w-[45%]">
                    <div className="w-full flex flex-col py-4">
                        <div className="flex flex-col gap-3 justify-start items-start p-3">
                            <span className="text-gray-900 font-semibold font-sans text-xl capitalize">
                                {productData.name}
                            </span>
                            <span className="text-gray-400 font-normal text-sm capitalize">
                                SKU: {productData.productCode}
                            </span>
                            <hr style={{borderTop: '1px solid gray', width: '100%'}}/>
                        </div>
                        <div>
                            <div className="flex justify-start gap-3 px-3">
                                <div className="py-3 text-center">
                                    <div className="text-xl text-red-500 font-semibold font-sans">
                                        {displayPrice?.toLocaleString()}đ
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 px-3">
                                <span  className="text-lg font-semibold font-sans">
                                    Màu Sắc
                                </span>
                                <div className="flex flex-row gap-3">
                                    {
                                        listColor.map((item, index) => {
                                            return (
                                                <div 
                                                    key={index} 
                                                    className={
                                                        clsx(
                                                            "overflow-hidden w-6 h-6 rounded-xl", 
                                                            currentParamDetail.color === item ?
                                                            'border-solid border-gray-950  border-2' :
                                                            ''
                                                        )
                                                    }
                                                    style={{backgroundColor: `${item}`}}
                                                    onClick={() => handleSetParamDetail({color: item})}
                                                >
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <span  className="text-lg font-semibold font-sans mt-10">
                                    Kích thước
                                </span>
                                <div className="flex flex-row gap-3">
                                {
                                        listSize.map((item, index) => {
                                            return (
                                                <div className="flex flex-row gap-1 items-center" key={index} onClick={() => handleSetParamDetail({size: item})}>
                                                    <div className={
                                                        clsx(
                                                            "w-4 h-4 rounded-lg border-solid border-gray-300 border-2",
                                                            currentParamDetail.size === item ?
                                                            'bg-slate-500': 
                                                            ''
                                                        )
                                                    }>
                                                
                                                    </div>
                                                    <span className="font-bold">
                                                        {item}
                                                    </span>
                                                </div>    
                                            )
                                        })
                                    }
                                </div>
                                <div className="mt-10">
                                    <form onSubmit={formik.handleSubmit} className="flex sx:flex-col xl:flex-row gap-3">
                                        <CartQuantityItem 
                                            name={"quantity"} 
                                            formik={formik} 
                                            label={""} 
                                            placeholder={""}
                                            maxProduct={displayProductDetail.quantity}
                                        />
                                        <div className="sx:w-full xl:w-2/3">
                                            <button className={clsx("w-full h-[60px] rounded-s text-white font-bold", style['background-button'])} type="submit">THÊM VÀO GIỎ</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="mt-10 w-full">
                                    <ProductDetailPolicy size={listSize} color={listColor} description={displayProductDetail?.description}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

