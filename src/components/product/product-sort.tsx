import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { setQuery } from "@/redux/slices/product-query.slice";
import { useState } from "react";

const productSortItems = [
    {
        title: 'Sản phẩm nổi bật',
        value: 'isHot', 
    },
    {
        title: 'Giá tăng dần',
        value: 'productDetails.price', 
    },
    {
        title: 'Giá giảm dần',
        value: '-price', 
    },
    {
        title: 'Tên A-Z',
        value: 'name', 
    },
    {
        title: 'Tên Z-A',
        value: '-name', 
    },
    {
        title: 'Cũ nhất',
        value: 'createdAt', 
    },
    {
        title: 'Mới nhất',
        value: '-createdAt', 
    },
    {
        title: 'Tồn kho giảm dần',
        value: '-productDetails.quantity', 
    },
]

export default function ProductSort() {
    const productQuery = useSelector((state: RootState) => state.productQuery.query)
    const dispatch = useDispatch()
    const [showSort, setShowSort] = useState(false)
    const handleSetQuery = (item: {title: string, value: string}) => {
        const queryData = {
            ...productQuery,
            sort: item.value,
            page: '1',
            perPage: '8',
        }
        dispatch(setQuery(queryData))
    }
    const getSortTitle = (sortValue: string) => {
        const sortTitle = productSortItems.filter(item => item.value === sortValue)
        if (sortTitle?.length) {
            return sortTitle[0].title
        }
    }
    return (
        <section 
            className="w-48 h-8 border-solid border-[1px] border-gray-400 rounded bg-gray-100 px-2 flex justify-start items-center gap-4 relative"
            onClick={() => setShowSort(!showSort)}
        >
            <SwapVertIcon className="text-sm text-gray-500" />
            <span className="text-sm font-sans font-thin">{getSortTitle(productQuery.sort)}</span>
            {
                showSort && (
                    <div className="
                        bg-white
                        absolute w-full 
                        h-auto flex flex-col 
                        justify-start items-center 
                        gap-1
                        -bottom-48
                        left-0
                        border-solid border-gray-300
                        border-[1px]
                        rounded-md
                        shadow-lg
                        z-50
                        "
                    >
                        {
                            productSortItems.map((item, index) => {
                                return (
                                    <span className="
                                    cursor-pointer text-gray-800
                                    text-sm font-light 
                                    " key={index} onClick={() => handleSetQuery(item)}>
                                        {item.title}
                                    </span>
                                )
                            })
                        }
                    </div>
                )
            }
            
        </section>
    )
}