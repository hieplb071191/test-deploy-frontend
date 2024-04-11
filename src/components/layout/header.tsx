"use client";

import React, { useCallback, useEffect, useRef, useState } from "react"
import SearchInput from "../input/search-input"
import axios from 'axios'
import { Inter } from 'next/font/google'
import CustomDropdown from "../input/custom-dropdown";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LoginForm from "../login-form/login-from";
import style from '../../style/header-style.module.scss'
import useClickOutside from "@/hooks/useClickOutSide";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ['latin'] })
const dropdownHomePageItem = [
    {
        title: 'header1',
        value: 'Header1'
    },
    {
        title: 'header1',
        value: 'Header1'
    },
    {
        title: 'header1',
        value: 'Header1'
    }
]

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

export default function Header () {
    const loginRef = useRef(null)
    const handlerSearch = useCallback(async (value: string) => {
        const test = await axios.get('https://lehiep-dev.xyz/api/health-check',)
    }, [])


    const token = useSelector((state: any) => state.token)
    useEffect(() => {
        console.log(token)
    }, [token])

    const handleClickDropdown = (value: string) => {
        console.log(value)
    }

    useClickOutside(loginRef, () => {
        setShowlogin(false)
    })

    const [showLogin, setShowlogin] = useState(false)

    return (
        <nav className="relative z-50 sx:hidden xl:block">
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
                <div className="xl:container h-full flex justify-between items-center">
                    <a href="/" className={`${inter.className} text-3xl text-slate-800 font-bold`}>K&M Style</a>
                    <div className="flex justify-center gap-4 h-full">
                        <CustomDropdown title={'Trang chủ'} items={dropdownHomePageItem} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Nam'} items={ManDropdownItem} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Product view'} items={ManDropdownItem} handler={handleClickDropdown}/>
                        <CustomDropdown title={'Blog'} items={[]} handler={handleClickDropdown}  isLink={true}/>
                        <CustomDropdown title={'Giới thiệu'} items={[]} handler={handleClickDropdown}  isLink={true}/>
                        <CustomDropdown title={'Liên hệ'} items={[]} handler={handleClickDropdown}  isLink={true}/>
                    </div>
                    <div className="flex justify-center gap-4 h-full items-center">
                        <div className="relative" ref={loginRef}>
                            <div onClick={() => setShowlogin(!showLogin)}>
                                <PeopleAltOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer"/>
                            </div>
                            {
                            showLogin && (
                                <div 
                                    className="absolute top-12 -right-5 xl:w-[400px] bg-white p-4 rounded-md z-30"  
                                    style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}
                                >
                                    <div className={`${style['triangle-up']} -top-4 absolute left-[350px] z-20`}>

                                    </div>
                                    <LoginForm />
                                </div>
                                )
                            }
                            
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

