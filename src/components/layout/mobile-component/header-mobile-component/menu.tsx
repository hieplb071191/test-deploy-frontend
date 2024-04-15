import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { manMenuItemsProps, womanMenuItemsProps } from '@/constant/menu.constant';


type ChildMenuProps = {
    items: {
            title: string,
            url: string,
            params: Record<string , string>
    }[]
    handleRedirect: (url: string, params?: Record<string , string>) => void
    handleClose: (params: any) => void
}

function ChildMenu({items, handleRedirect, handleClose}: ChildMenuProps) {
    return (
        <section className="flex flex-col absolute top-0 left-0 bg-white w-full h-full">
            <div className="flex flex-row justify-start gap-4 items-center px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 cursor-pointer" 
                onClick={() => {
                    handleClose([])
                }}>
                    <ChevronLeftIcon fontSize='small'/>
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        Quay về
                    </span>
                </div>
            </div>
            {
                items.map(((item, index) => (
                    <div className="flex flex-row justify-between items-center px-4" key={index}>
                        <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 cursor-pointer" 
                        onClick={() => {
                            handleRedirect(item.url, item.params)
                            handleClose([])
                        }}>
                            <span className="text-lg font-medium text-gray-900 font-sans">
                                {item.title}
                            </span>
                        </div>
                    </div>
                )))
            }
        </section>
    )
}

export default function Menu({handleClose}: {
    handleClose: (...params: any | null) => void | any
}) {
    const [childMenuItems, setChildMenuItems] = useState<any[]>([])
    const router = useRouter()
    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set(name, value);
    
        return params.toString();
    };


    const handleRedirect = (url: string, query?: any) => {
        let hrefStr = url
        if (query) {
            const keyParams = Object.keys(query)
            keyParams.forEach((item, index) => {
                if(index === 0) {
                    hrefStr += `?${createQueryString(item, query[item])}`
                } else {
                    hrefStr += `&${createQueryString(item, query[item])}`
                }
            })
        }
        router.push(hrefStr)
        handleClose('')
    }
    return (
        <section className="flex flex-col relative">
            <div className="flex flex-row justify-between items-center px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 cursor-pointer" onClick={() => handleRedirect('/')}>
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        TRANG CHỦ
                    </span>
                </div>
            </div>
            <div className="px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 flex flex-row justify-between items-center cursor-pointer" onClick={() => setChildMenuItems(manMenuItemsProps)}>
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        NAM
                    </span>
                    <KeyboardArrowRightIcon fontSize='small' />
                </div>
            </div>
            <div className="px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 flex flex-row justify-between items-center cursor-pointer" onClick={() => setChildMenuItems(womanMenuItemsProps)}>
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        NỮ
                    </span>
                    <KeyboardArrowRightIcon fontSize='small' />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 cursor-pointer">
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        BLOG
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <div className="border-b-[1px] border-solid border-zinc-300 w-full py-3 cursor-pointer">
                    <span className="text-lg font-medium text-gray-900 font-sans">
                        LIÊN HỆ
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-4">
                <div className="w-full py-3">
                    <span className="text-lg font-medium text-gray-400 font-sans">
                        BẠN CẦN HỖ TRỢ
                    </span>
                </div>
            </div>
            {
                !!childMenuItems.length && (
                    <ChildMenu items={childMenuItems} handleRedirect={handleRedirect} handleClose={setChildMenuItems}/>
                )
            }
        </section>
    )
}