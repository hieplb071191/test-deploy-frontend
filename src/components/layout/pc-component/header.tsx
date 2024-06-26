"use client";

import React, { useCallback, useEffect, useRef, useState } from "react"

import axios from 'axios'
import { Inter } from 'next/font/google'

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import style from '../../style/header-style.module.scss'
import useClickOutside from "@/hooks/useClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/token.slice";
import SearchInput from "@/components/input/search-input";
import CustomDropdown, { CustomDropdownProp } from "@/components/input/custom-dropdown";
import { logginItem, manMenuItemsProps, notLoggedItems } from "@/constant/menu.constant";
import { setQuery } from "@/redux/slices/product-query.slice";
import CartPopup from "@/components/cart-popup/cart-popup";

const inter = Inter({ subsets: ['latin'] })


export default function HeaderPC ({
    itemCartNumber = 0
}) {
    const loginRef = useRef(null)
    const handlerSearch = useCallback(async (value: string) => {
        const test = await axios.get('https://lehiep-dev.xyz/api/health-check',)
    }, [])


    const [showLogin, setShowlogin] = useState(false)
    const [isLogged, setLogged] = useState(false)
    const token = useSelector((state: any) => state.token)
    const [showCartPopup, setShowCartPopup] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        if (token.token) {
            setLogged(true)
        }
    }, [token])

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set(name, value);
    
        return params.toString();
    };
    
    const handleClickDropdown = (url: string, query?: any) => {
        let hrefStr = url
        if (query) {
            dispatch(setQuery(query))
        }
        router.push(hrefStr)
    }

    const handleClickLoggin = (value: string) => {
        router.push(value)
    }

    const handleClickWhenLogged = (value: string) => {
        switch (value) {
            case 'logout': 
                dispatch(logout())
                setLogged(false)
                break;
        }
    }

    useClickOutside(loginRef, () => {
        setShowlogin(false)
    })


    return (
        <nav className="relative z-50 sx:hidden xl:block w-full">
            <section className="bg-[#e2f3f0] h-[53px] flex justify-center">
                <div className="xl:container h-full flex justify-between items-center">
                    <span className="text-xs font-light text-slate-950">
                        Email:hi@haravan.com Hotline:1900.636.099
                    </span>
                    <div>
                        <span className="text-xs font-medium text-slate-950">
                            SALE:
                        </span>
                        <span className="text-xs font-light text-slate-950">
                            Tặng khẩu trang với đơn hàng trên 1.200.000đ
                        </span>
                    </div>
                    <div>
                        <SearchInput placeholder="Tìm kiếm sản phẩm" className="w-56" handler={handlerSearch}/>
                    </div>
                </div>
            </section>
            
            <section className="bg-white w-full h-20 flex justify-center">
                <div className="sx:hidden xl:flex xl:container h-full justify-between items-center">
                    <a href="/" className={`${inter.className} text-3xl text-slate-800 font-bold`}>K&M Style</a>
                    <div className="flex justify-center gap-8 h-full">
                        <CustomDropdown title={'Trang chủ'} datas={[]} handler={handleClickDropdown} link={'/'} />
                        <CustomDropdown title={'Sản phẩm'} datas={manMenuItemsProps as any[]} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Blog'} datas={[]} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Giới thiệu'} datas={[]} handler={handleClickDropdown} />
                        <CustomDropdown title={'Liên hệ'} datas={[]} handler={handleClickDropdown}/>
                    </div>
                    <div className="flex justify-center gap-4 h-full items-center">
                        <div className="relative h-full flex justify-center items-center" ref={loginRef}>
                                <CustomDropdown title=''  datas={!isLogged ? notLoggedItems : logginItem} handler={!isLogged ? handleClickLoggin : handleClickWhenLogged}>
                                    <PeopleAltOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer"/>
                                </CustomDropdown>   
                        </div>
                        <div className="relative">
                            <LocalMallOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer" onClick={() => setShowCartPopup(!showCartPopup)}/>
                            <div className="w-5 h-5 bg-slate-700 flex justify-center items-center" style={{position: 'absolute', borderRadius: '50%', top: '-12px', left: '14px'}}>
                                <span className="text-white font-sans text-xs">
                                    {itemCartNumber}
                                </span>
                            </div>
                            {
                                !!showCartPopup && (
                                    <div className="absolute w-[500px] h-auto bg-white right-0 top-10 shadow-lg">
                                        <CartPopup onClose={() => setShowCartPopup(false)}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>  
            </section>
        </nav>
    )
}

