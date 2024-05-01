"use client";

import { useDispatch, useSelector } from "react-redux";
import { HeaderMobile } from "./mobile-component/header";
import HeaderPC from "./pc-component/header";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { get } from "@/api/api-service";
import { setCart } from "@/redux/slices/cart.slice";
import { AxiosError, AxiosResponse } from "axios";
import { setToken } from "@/redux/slices/token.slice";


export default function Header () {
    const cart = useSelector((state: RootState) =>  state.cart.cart)
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            get('/user-cart/cart', {}, token).then((res: AxiosResponse) => {
                dispatch(setCart(res.data))
            }).catch((e: AxiosError) => {
                if (e.status === 401) {
                    dispatch(setCart(null))
                    dispatch(setToken(''))
                }
            })
        } else {
            dispatch(setCart(null))
        }
    },[token])
    return (
        <>
            <HeaderPC itemCartNumber={cart?.items?.length ?? 0} />
            <HeaderMobile itemCartNumber={cart?.items?.length ?? 0} />
        </>
    )
}

