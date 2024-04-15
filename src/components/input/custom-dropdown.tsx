
export interface CustomDropdownProp {
    title: string,
    children?: Component | any,
    datas: {
            title: string,
            url: string,
            params?: Record<string , string>
    }[]

    handler: (url: string, params?: Record<string , string>) => void
    link?: string
}
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Component, useState } from 'react';
import style from '../../style/header-style.module.scss'


const CustomDropdown = (prop: CustomDropdownProp) => {
    const [classDisplay, setClassDisplay] = useState<string>('handle-not-display')
    const { title, datas, handler, link, children } = prop

    return (
        <div className={`w-auto h-full relative flex justify-center items-center font-semibold ${style['parent-display']} ${style['disable']}`}
            onMouseEnter={(event) =>setClassDisplay('handle-display')} 
            onMouseLeave={(event) =>setClassDisplay('handle-not-display')}>
                <div className={`w-full h-full flex justify-center items-center ${style['title']}`}>
                    {   children ? children : 
                        link ? (
                            <>
                                {
                                    (<a href={link}>{title}</a>)
                                }
                                
                            </>
                        ) : (
                            <>{title}&nbsp;<span><ArrowDropDownIcon fontSize={'small'} /></span></>
                        )
                    }
                    
                </div>
            
            <ul className={`absolute top-full left-0 z-40 shadow-md bg-white min-w-40 flex-col flex ${style[classDisplay]}`}>
                {
                    datas.map((item, index) => {
                        return (
                            <div key={index}>
                                <li className={`cursor-pointer font-light px-5 py-2 relative`} onClick={() => handler(item.url, item.params)}>
                                    {item.title}
                                </li>
                                <hr className='w-full align-middle h-[1px]' />
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CustomDropdown