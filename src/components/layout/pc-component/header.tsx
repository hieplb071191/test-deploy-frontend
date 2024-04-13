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
import CustomDropdown from "@/components/input/custom-dropdown";

const inter = Inter({ subsets: ['latin'] })

const ManDropdownItem = [
    {
        title: 'Túi xách',
        value: 'Header1'
    },
    {
        title: 'Sản phẩm nam',
        value: 'Header1'
    },
    {
        title: 'Sản phẩm giày',
        value: 'Header1'
    }
]

const notLoggedItems = [
    {
        title: 'Sign In',
        value: '/login'
    },
    {
        title: 'Sign up',
        value: '/signup'
    },
]

const logginItem = [
    {
        title: 'Logout',
        value: 'logout'
    },
]

export default function HeaderPC () {
    const loginRef = useRef(null)
    const handlerSearch = useCallback(async (value: string) => {
        const test = await axios.get('https://lehiep-dev.xyz/api/health-check',)
    }, [])


    const [showLogin, setShowlogin] = useState(false)
    const [isLogged, setLogged] = useState(false)
    const token = useSelector((state: any) => state.token)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        if (token.token) {
            setLogged(true)
        }
    }, [token])

    const handleClickDropdown = (value: string) => {
        console.log(value)
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
                    <div className="flex justify-center gap-4 h-full">
                        <CustomDropdown title={'Trang chủ'} items={[]} handler={handleClickDropdown} link={'/'} />
                        <CustomDropdown title={'Nam'} items={ManDropdownItem} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Product view'} items={ManDropdownItem} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Blog'} items={[]} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Giới thiệu'} items={[]} handler={handleClickDropdown} />
                        <CustomDropdown title={'Liên hệ'} items={[]} handler={handleClickDropdown}/>
                    </div>
                    <div className="flex justify-center gap-4 h-full items-center">
                        <div className="relative h-full flex justify-center items-center" ref={loginRef}>
                                <CustomDropdown title=''  items={!isLogged ? notLoggedItems : logginItem} handler={!isLogged ? handleClickLoggin : handleClickWhenLogged}>
                                    <PeopleAltOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer"/>
                                </CustomDropdown>   
                        </div>
                        <div>
                            <LocalMallOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer" />
                        </div>
                    </div>
                </div>  
            </section>
        </nav>
    )
}
