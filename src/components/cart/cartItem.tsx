'use client'
import { useMemo, useState } from "react"
import style from '../../style/cart-item.module.scss'
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export type CartItemProps = {
    listImage: string[],
    price: number,
    discount?: any,
    id: string,
    quantity?: number,
    name: string,
    imageHover: string
}

const CartItem = ({ 
    listImage, price, 
    discount = {
        type: 'number',
        value: 0
    }, 
    id, 
    quantity, 
    name,
    imageHover 
}: CartItemProps) => {
    const discountPrice = useMemo(() => {
        if (discount.type === 'percent') {
            return price - (price * discount.value / 100)
        } else {
            return price - discount.value
        }
    }, [price, discount])
    const [isHoverImage, setHoverImage] = useState(false)
    const [activeImage, setActiveImage] = useState(listImage[0])
    return (
        <div className="flex flex-col justify-start items-start mx-3 gap-3">
            <div className="w-full cursor-pointer relative h-96" onMouseEnter={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)}>
                {
                    isHoverImage ? 
                        (<img src={imageHover} alt="" className="object-contains w-full h-full"/> ) 
                        : 
                        (<img src={activeImage} alt="" className="object-contains w-full h-full"/> )
                }
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
                <span className={discount.value ? `text-rose-600` : `text-black`}>
                    {discountPrice.toLocaleString("en-US")}đ
                </span>
                {
                    discount.value ? (
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

export default CartItem