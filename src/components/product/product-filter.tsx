import { get } from "@/api/api-service";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx'
import { ToastContainer, toast } from 'react-toastify';
import { setQuery } from "@/redux/slices/product-query.slice";
import style from '@/style/product-filter.module.scss'

const defaultItems = {
    type: [
        {
            title: 'Túi xách',
            value: 'handBag',
        },
        {
            title: 'Giày',
            value: 'shoes',
        },
        {
            title: 'Quần áo',
            value: 'clothes',
        }
    ],
    price: [
        {
            low: 0,
            hight: 500000
        },
        {
            low: 500000,
            hight: 1000000
        },
        {
            low: 1000000,
            hight: 1500000
        },
        {
            low: 1500000,
            hight: 2000000
        },
        {
            low: 2000000,
            hight: 5000000
        },
        {
            low: 5000000,
        },
    ]
}

export function ProductFilter() {
    const dispatch = useDispatch()
    const productQuery = useSelector((state: RootState) => state.productQuery.query)
    const [itemFilter, setItemFilter] = useState<any>(defaultItems)

    useEffect(() => {
        get('product-public/get-query-data').then(res => {
            setItemFilter((prev:any) => {
                return {
                    ...defaultItems,
                    ...res.data
                }
            })
        }).catch(e => {
            toast(e.message)
        })
    }, [])

    const handleSetQuery = (value: Record<string, any>, typeQuery: string) => {
        if (typeQuery === 'price') {
            if (value.low === productQuery.low && value.high === productQuery.high) {
                const queryData = {
                    ...productQuery,
                    low: null,
                    high: null
                }
                dispatch(setQuery(queryData))
            } else {
                const queryData = {
                    ...productQuery,
                    ...value
                }
                dispatch(setQuery(queryData))
            }
        }
        if (typeQuery === 'branch') {
            if (productQuery.branch?.includes(value.branch)) {
                const lstBranch = productQuery.branch.split(',')
                const listBranchFilter = lstBranch.filter((branch: string) => branch !== value.branch)
                const queryData = {
                    ...productQuery,
                    branch: listBranchFilter.join(',')
                }
                dispatch(setQuery(queryData))
            } else {
                if (!productQuery.branch) {
                    const queryData = {
                        ...productQuery,
                        ...value
                    }
                    dispatch(setQuery(queryData))
                } else {
                    const listBranch = productQuery.branch.split(',') || []
                    listBranch.push(value.branch)
                    const queryData = {
                        ...productQuery,
                        branch: listBranch.join(',')
                    }
                    dispatch(setQuery(queryData))
                }
            }
        }
        if (typeQuery === 'type') {
            if (productQuery.type === value.type) {
                const queryData = {
                    ...productQuery,
                    type: null
                }
                dispatch(setQuery(queryData))
            } else {
                const queryData = {
                    ...productQuery,
                    ...value
                }
                dispatch(setQuery(queryData))
            }
        }
        
    }

    return (
        <section className="p-6">
            <div className="flex flex-col gap-4 font-sans">
                <span className="text-base font-bold">
                    Danh mục sản phẩm
                </span>
                <ol>
                    {
                        itemFilter.type.map((item: any, key: number) => {
                            return (
                                <li key={key} 
                                className={"mt-2 text-sm text-gray-600 cursor-pointer"} 
                                onClick={() => handleSetQuery({type: item.value}, 'type')}>
                                    <span className={
                                        productQuery.type === item.value ? clsx('font-bold') : ''
                                    }>
                                        {item.title}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ol>
                <hr className="text-gray-600"/>
            </div>
            <div className="flex flex-col gap-4 font-sans mt-5">
                <span className="text-base font-bold">
                    Thương hiệu
                </span>
                <ol>
                    {
                        itemFilter.listBranch && itemFilter.listBranch.map((item: any, key: number) => {
                            return (
                                <li key={key} className="mt-2 text-sm text-gray-600 cursor-pointer" onClick={() => handleSetQuery({branch: item}, 'branch')}>
                                    <div className="flex flex-row justify-start items-center gap-3 ">
                                        <div className={productQuery.branch?.includes(item) ? style['branch-select'] : clsx('w-4 h-4 rounded-lg border-solid border-[1px] border-black')}></div>
                                        {item}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
                <hr className="text-gray-600"/>
            </div>
            <div className="flex flex-col gap-4 font-sans mt-5">
                <span className="text-base font-bold">
                    Giá sản phẩm
                </span>
                <ol>
                    {
                        itemFilter.price.map((item: any, key: number) => {
                            if (!item.low) {
                                return (
                                    <li key={key} className={
                                        clsx("mt-2 text-sm text-gray-500 cursor-pointer")
                                    } 
                                        onClick={() => handleSetQuery({
                                            low: null,
                                            high: item.hight
                                        }, 'price')} 
                                    >
                                        <div className="flex flex-row justify-start items-center gap-3">
                                            <div className={
                                                productQuery.low === null && productQuery.high === item.hight ? 
                                                style['branch-select'] : 
                                                clsx('w-4 h-4 rounded-lg border-solid border-[1px] border-black')
                                            }></div>
                                            Dưới {item.hight.toLocaleString()}đ
                                        </div>
                                    </li>
                                )
                            } else if (!item.hight) {
                                return (
                                    <li key={key} className={
                                        clsx("mt-2 text-sm text-gray-500 cursor-pointer")
                                    } 
                                        onClick={() => handleSetQuery({
                                            low: item.low,
                                            high: null
                                        }, 'price')} 
                                    >
                                        <div className="flex flex-row justify-start items-center gap-3">
                                            <div className={
                                                productQuery.low === item.low && productQuery.high === null ? 
                                                style['branch-select'] : 
                                                clsx('w-4 h-4 rounded-lg border-solid border-[1px] border-black')
                                            }></div>
                                            Trên {item.low.toLocaleString()}đ
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={key} className="mt-2 text-sm text-gray-500 cursor-pointer"
                                    onClick={() => handleSetQuery({
                                        low: item.low,
                                        high: item.hight,
                                    }, 'price')} 
                                    >
                                        <div className="flex flex-row justify-start items-center gap-3">
                                            <div className={
                                                productQuery.low === item.low && productQuery.high === item.hight ? 
                                                style['branch-select'] : 
                                                clsx('w-4 h-4 rounded-lg border-solid border-[1px] border-black')
                                            }></div>
                                            {item.low.toLocaleString()}đ - {item.hight.toLocaleString()}đ
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ol>
                <hr className="text-gray-600"/>
            </div>
            <ToastContainer />
        </section>
    )
}