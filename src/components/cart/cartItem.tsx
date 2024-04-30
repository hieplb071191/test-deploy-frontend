'use client'
import { useMemo, useState } from "react"
import style from '../../style/cart-item.module.scss'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useRouter } from "next/navigation";

export type CartItemProps = {
    listImage: string[],
    price: number,
    discount?: any,
    id: string,
    quantity?: number,
    name: string,
    imageHover: string,
    isHorizontal?: boolean
}

const CartItem = ({ 
    listImage, price, 
    discount = {
        discountType: 'number',
        discountValue: 0
    }, 
    id, 
    quantity, 
    name,
    imageHover ,
    isHorizontal = false
}: CartItemProps) => {
    const discountPrice = useMemo(() => {
        if (discount.discountType === 'percent') {
            return price - (price * discount.discountValue / 100)
        } else {
            return price - discount.discountValue
        }
    }, [price, discount])
    const [isHoverImage, setHoverImage] = useState(false)
    const [activeImage, setActiveImage] = useState(listImage[0])
    const router = useRouter()

    const getLayout = () => {
        if (isHorizontal) {
            return (
                <div className="flex flex-row justify-start items-start mx-3 gap-3 py-3">
                    <div className="w-2/5 cursor-pointer relative h-40" onMouseEnter={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)}>
                        <div className="w-full h-full" onClick={() => router.replace(`product-detail?productId=${id}`)}>
                            {
                                isHoverImage ? 
                                    (<img src={imageHover} alt="" className="object-contains w-full h-full"/> ) 
                                    : 
                                    (<img src={activeImage} alt="" className="object-contains w-full h-full"/> )
                            }
                        </div>
                        
                        {
                            isHoverImage ? (
                                <div className={`absolute ${style['hover-display-item']} flex justify-center items-center`}>
                                    <ZoomInIcon fontSize="large"/>
                                </div>
                            ) : (<></>)
                        }
                        
                    </div>
                    <div className="w-3/5 flex flex-col gap-3 truncate text-ellipsis">
                        <span className="text-base font-light">
                            {name}
                        </span>
                        <span className="text-base font-semibold font-sans flex justify-start gap-3">
                        <span className={discount.discountValue ? `text-rose-600` : `text-black`}>
                            {discountPrice.toLocaleString("en-US")}đ
                        </span>
                        {
                            discount.discountValue ? (
                                <span className="text-base font-semibold font-sans text-gray-500 line-through">
                                    {price.toLocaleString()}đ
                                </span>
                            ) : (<></>)
                        }
                        </span>
                        <div className="flex justify-start gap-3">
                            {
                                listImage.map((item, index) => {
                                    return (
                                        <div className="w-5 h-5 overflow-hidden hover:border-solid hover:border-2 hover:border-indigo-600" key={index} style={{borderRadius: "50%"}} onMouseEnter={() => setActiveImage(item)}>
                                            <img src={item} alt="" className="object-contains w-full h-full"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                </div>
            )
        } else {
            return (  
                <div className="flex flex-col justify-start items-start mx-3 gap-3 py-3">
                    <div className="w-full cursor-pointer relative h-96" onMouseEnter={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)}>
                        <div className="w-full h-full" onClick={() => router.replace(`product-detail?productId=${id}`)}>
                            {
                                isHoverImage ? 
                                    (<img src={imageHover} alt="" className="object-contains w-full h-full"/> ) 
                                    : 
                                    (<img src={activeImage} alt="" className="object-contains w-full h-full"/> )
                            }
                        </div>
                        
                        {
                            isHoverImage ? (
                                <div className={`absolute ${style['hover-display-item']} flex justify-center items-center`}>
                                    <ZoomInIcon fontSize="large"/>
                                </div>
                            ) : (<></>)
                        }
                        
                    </div>
                    <span className="text-sm font-light">
                        {name}
                    </span>
                    <span className="text-base font-semibold font-sans flex justify-start gap-5">
                        <span className={discount.discountValue ? `text-rose-600` : `text-black`}>
                            {discountPrice.toLocaleString("en-US")}đ
                        </span>
                        {
                            discount.discountValue ? (
                                <span className="text-base font-semibold font-sans text-gray-500 line-through">
                                    {price.toLocaleString()}đ
                                </span>
                            ) : (<></>)
                        }
                    </span>
                    <div className="flex justify-start gap-3">
                        {
                            listImage.map((item, index) => {
                                return (
                                    <div className="w-5 h-5 overflow-hidden hover:border-solid hover:border-2 hover:border-indigo-600" key={index} style={{borderRadius: "50%"}} onMouseEnter={() => setActiveImage(item)}>
                                        <img src={item} alt="" className="object-contains w-full h-full"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
    return getLayout()
    
}

export default CartItem