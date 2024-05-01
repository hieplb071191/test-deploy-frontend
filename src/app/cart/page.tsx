'use client'

import { get } from "@/api/api-service"
import { setToken } from "@/redux/slices/token.slice"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export default function CartPage () {
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()
    const [currentCart, setCurrentCart] = useState<any>(null)
    const router = useRouter()

    const getCurrenCart = (token: string) => {
        get('/user-cart/cart', {}, token).then(res => {
            console.log(res.data)
            if (res.data) {
                setCurrentCart(res.data)
            }
        }).catch(e => {
            if (e.response?.status === 401) {
                toast.error('xin đăng nhập')
                dispatch(setToken(''))
                router.replace('login')
            } else {
                toast.error(e.message)
                toast.error('Đã có lỗi xảy ra')
            }
           
        })
    }

    useEffect(() => {
        if (!token) {
            router.replace('/login')
        }
        getCurrenCart(token)
    }, [token])


    return(
        <section>
            <div className="sx:w-full xl:container m-auto flex flex-col justify-center items-center gap-3">
                <span className="text-3xl font-sans font-semibold">
                    Giỏ hàng của bạn
                </span>
                <span>
                    Có {currentCart?.items?.length} sản phẩm trong giỏ hàng của bạn
                </span>
            </div>
        </section>
    )
}