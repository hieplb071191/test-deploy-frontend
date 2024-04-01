'use client'

import React from "react"
import SearchIcon from '@mui/icons-material/Search';

export type PropInputType = {
    placeholder: string,
    className?: string,
    handler: (value: string) => void
}

export default function SearchInput ({
    placeholder = 'Tìm kiếm sản phẩm',
    className = '',
    handler
}: PropInputType) {
    const [value, setValue] = React.useState<string>('')
    React.useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <div className={`${className} relative z-10`}>
            <input type="text" className="w-full h-8  outline-none pl-2 pr-8" placeholder={placeholder} onChange={(event) => {
                setValue(event.currentTarget.value)
            } }>
            </input>
            <SearchIcon 
                className="absolute z-20 top-1 right-1 cursor-pointer"
                color="disabled"
                onClick={() => handler(value)}
            />
        </div>
    )
}