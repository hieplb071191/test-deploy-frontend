'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { get } from "@/api/api-service"
import { toast } from "react-toastify"
import clsx from 'clsx'

export default function ProductDetail() {

    const searchParams = useSearchParams() 
    const [productId, setProductId] = useState<string | null>('')
    const [productData, setProductData ] = useState<any>({})
    const [productDetails, setProductDetails] = useState<any[]>([])
    const [displayProductDetail, setDisplayProductDetail] = useState<any>({})
    const [displayPrice, setDisplayPrice] = useState<number>(0)
    const [listImages, setListImages] = useState<any[]>([])

    useEffect(() => {
        setProductId(searchParams.get('productId'))
    }, [searchParams])

    useEffect(() => {
        get(`/product-public/get-one-product/${productId}`).then(res => {
            console.log('resData detail', res.data)
            setProductData(res.data)
            setProductDetails(prev => {
                return res.data?.productDetails ? res.data?.productDetails : prev
            })
            setDisplayProductDetail((prev: any) => {
                return res.data?.productDetails ? res.data?.productDetails[0] : prev
            })
        }).catch(e => {
            toast.error(e.message)
        })
    }, [productId])

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
            const listImages = productDetails.map(item => {
                return {
                    id: item._id,
                    image: item.imageUrls[0]
                }
            })
            setListImages(listImages)
        }
    }, [displayProductDetail, productDetails])

    return (
        <section className="sx:hidden xl:flex container mx-auto">
            <div className="w-[1190px] flex justify-start gap-4 mx-auto">
                <div className="w-[55%] grid grid-cols-2">
                    {
                        productData?.imageUrls?.length && productData.imageUrls.map((item: any, index: number) => {
                            return (
                                <div key={index} className="p-3 w-full h-96">
                                    <img src={item} alt={item} className="object-cover w-full h-full"/>
                                </div>        
                            )
                        })
                    }
                </div>
                <div className="flex flex-col w-[45%]">
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
                                    {displayPrice.toLocaleString()}đ
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 px-3">
                            <span  className="text-lg font-semibold font-sans">
                                Màu Sắc
                            </span>
                            <div className="flex flex-row gap-3">
                                {
                                    listImages.map((item, index) => {
                                        return (
                                            <div key={index} className={clsx("overflow-hidden w-6 h-6 rounded-xl", displayProductDetail._id === item.id ? 'border-solid border-green-500  border-2' : '')} >
                                                <img src={item.image} className="object-cover w-full h-full"/>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

