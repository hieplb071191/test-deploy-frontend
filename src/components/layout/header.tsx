"use-client";

import React, { useCallback } from "react"
import SearchInput from "../input/search-input"
import axios from 'axios'

export default function Header () {
    const handlerSearch = useCallback(async (value: string) => {
        'use server';
        const test = await axios.get('https://lehiep-dev.xyz/api/health-check',)
    }, [])

    return (
        <nav >
            <section className="bg-[#e2f3f0] h-[53px] flex justify-center">
                <div className="xl:container heigh-full flex justify-between items-center">
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
            <section>

            </section>
        </nav>
    )
}