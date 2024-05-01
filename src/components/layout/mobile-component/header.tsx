import MenuIcon from '@mui/icons-material/Menu';
import { Inter } from 'next/font/google';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { HeaderParentMenu } from './header-mobile-component/parent-menu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/token.slice';
import { useRouter } from 'next/navigation';
import CustomDropdown from '@/components/input/custom-dropdown';
import { logginItem, notLoggedItems } from '@/constant/menu.constant';
export enum ShowMenuTarget {
    MENU = 'menu',
    CARD = 'card',
}

const inter = Inter({ subsets: ['latin'] })

export function HeaderMobile ({itemCartNumber = 0}) {
    const [showMenuHeader, setShowMenuHeader] = useState<ShowMenuTarget | '' >('')
    const [isLogged, setLogged] = useState(false)
    const token = useSelector((state: any) => state.token)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if (token.token) {
            setLogged(true)
        }
    }, [token])

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

    return (
        <nav className="relative z-50 sx:block xl:hidden w-full">
            <section className="bg-[#e2f3f0] h-[53px] flex justify-center">
                <div className="flex container justify-around gap-6 w-full mx-auto px-3 py-5">
                    <div>
                        <span className="text-xs font-medium text-slate-950">
                            SALE:
                        </span>
                        <span className="text-xs font-light text-slate-950">
                            Tặng khẩu trang với đơn hàng trên 1.200.000đ
                        </span>
                    </div>
                </div>
                
            </section>
            <section className="bg-white w-full h-16 flex justify-between px-2">
                {
                    showMenuHeader === ShowMenuTarget.MENU 
                    ? (
                        <div className='relative w-8 relatice h-full flex justify-center items-center' onClick={() => setShowMenuHeader('')}>
                            <ClearIcon />
                        </div>
                    ) 
                    : (
                        <div className='relative w-8 relatice h-full flex justify-center items-center' onClick={() => setShowMenuHeader(ShowMenuTarget.MENU)}>
                            <MenuIcon />
                        </div>
                    )
                }
                <div className='h-full flex justify-center items-center'>
                    <a href="/" className={`${inter.className} text-2xl text-slate-800 font-bold font-sans`}>K&M Style</a>
                </div>
                <div className="relative h-full flex justify-center items-center">
                    <div className="relative h-full flex justify-center items-center">
                            <CustomDropdown title=''  datas={!isLogged ? notLoggedItems : logginItem} handler={!isLogged ? handleClickLoggin : handleClickWhenLogged}>
                                <PeopleAltOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer"/>
                            </CustomDropdown>   
                    </div>
                    
                </div>
                {
                      showMenuHeader === ShowMenuTarget.CARD 
                      ? (
                          <div className='relative w-8 relatice h-full flex justify-center items-center' onClick={() => setShowMenuHeader('')}>
                              <ClearIcon />
                          </div>
                      ) 
                      : (
                            <div className="relative h-full flex justify-center items-center" onClick={() => setShowMenuHeader(ShowMenuTarget.CARD)}>
                                <LocalMallOutlinedIcon sx={{fontSize: '30px'}} className="cursor-pointer" />
                                <div className="w-5 h-5 bg-slate-700 flex justify-center items-center" style={{position: 'absolute', borderRadius: '50%', top: '7px', left: '15px'}}>
                                    <span className="text-white font-sans text-xs">
                                        {itemCartNumber}
                                    </span>
                                </div>
                            </div>
                      )
                }
                
            </section>
            {
                (showMenuHeader !== '') && <HeaderParentMenu targetMenu={showMenuHeader} handleclose={setShowMenuHeader}/>
            }
            
        </nav>
    )
}    