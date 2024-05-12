import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FacebookEmbed } from "react-social-media-embed";
import { BorderBottom } from "@mui/icons-material";

const style={
    padding: '12px 0',
}


export default function FooterMobile() {
    const [activeTab, setActiveTab] = useState<number>(0)
    const [openDropdown, setOpenDropdown] = useState(false)

    const handleOpenContentFooter = (tab: number) => {
        setActiveTab(prev => {
            if (prev === tab) {
                return 0
            } else {
                return tab
            }
        })
    }

    return (
        <section className="sx:flex flex-col md:hidden w-full">
            <div className="bg-[#333e48] w-full h-16 flex justify-center items-center" onClick={() => setOpenDropdown(!openDropdown)}>
                <span className="text-lg text-[#9f9f9f] font-semibold font-sans work tracking-wider">Thông tin khác</span> &nbsp; 
                {
                    !openDropdown ? (
                        <span><ArrowDropDownIcon className="text-lg text-[#9f9f9f]" /></span>
                    ) : (
                        <span><ArrowDropUpIcon className="text-lg text-[#9f9f9f]"/></span>
                    )
                }
                
            </div>
            {
                openDropdown && (
                    <div className="flex flex-col bg-[#232323] p-2">
                        <div className="px-3" onClick={() => handleOpenContentFooter(1)}>
                            <div className="w-full flex justify-between items-center" style={style}>
                                <span className="text-[#9f9f9f]">
                                    GIỚI THIỆU
                                </span>
                                {
                                    activeTab === 1 ? (<>
                                        <span><ArrowDropUpIcon className="text-lg text-[#9f9f9f]"/></span>
                                    </>) : (
                                        <span><ArrowDropDownIcon className="text-lg text-[#9f9f9f]" /></span>
                                        
                                    )
                                }
                            </div>
                            {
                                activeTab === 1 && (
                                    <div className="flex flex-col justify-start items-start">
                                        <span className="text-[#9f9f9f] font-sans text-sm max-w-80 mt-2">
                                            K&M Style trang mua sắm trực tuyến của thương hiệu thời trang Lama, thời trang nam, nữ, phụ kiện, giúp bạn tiếp cận xu hướng thời trang mới nhất.
                                        </span>
                                        <div className="mt-4 mb-4">
                                            <img 
                                                data-src='https://theme.hstatic.net/1000406172/1000655826/14/logo_bct.png?v=164' 
                                                src='https://theme.hstatic.net/1000406172/1000655826/14/logo_bct.png?v=164' 
                                                width={200}
                                                height={76}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            <hr style={{borderTop: '0.5px solid #9f9f9f'}}/>
                        </div>
                        <div className="px-3" onClick={() => handleOpenContentFooter(2)}>
                            <div className="w-full flex justify-between items-center" style={style}>
                                <span className="text-[#9f9f9f]">
                                    LIÊN KẾT
                                </span>
                                {
                                    activeTab === 2 ? (<>
                                        <span><ArrowDropUpIcon className="text-lg text-[#9f9f9f]"/></span>
                                    </>) : (
                                        <span><ArrowDropDownIcon className="text-lg text-[#9f9f9f]" /></span>
                                        
                                    )
                                }
                            </div>
                            {
                                activeTab === 2 && (
                                    <div className="flex flex-col gap-3 mt-2 text-[#9f9f9f] text-sm mb-4">
                                        <span>
                                            <a href="#" >Tìm Kiếm</a>
                                        </span>
                                        <span>
                                            <a href="#" >Giói thiệu</a>
                                            
                                        </span>
                                        <span>
                                            <a href="#" >Chính sách đổi trả</a>
                                        </span>
                                        <span>
                                            <a href="#" >Chính sách bảo mật</a>
                                        </span>
                                        <span>
                                            <a href="#" >Điều khoản dịch vụ</a>
                                        </span>
                                    </div>
                                )
                            }
                            <hr style={{borderTop: '0.5px solid #9f9f9f'}}/>
                        </div>
                        <div className="px-3" onClick={() => handleOpenContentFooter(3)}>
                            <div className="w-full flex justify-between items-center" style={style}>
                                <span className="text-[#9f9f9f]">
                                    THÔNG TIN LIÊN HỆ
                                </span>
                                {
                                    activeTab === 3 ? (<>
                                        <span><ArrowDropUpIcon className="text-lg text-[#9f9f9f]"/></span>
                                    </>) : (
                                        <span><ArrowDropDownIcon className="text-lg text-[#9f9f9f]" /></span>
                                        
                                    )
                                }
                            </div>
                            {
                                activeTab === 3 && (
                                    <div className="flex flex-col mt-2 mb-4 w-[267px] gap-3">
                                        <div className="flex flex-row justify-start items-center gap-3 text-[#9f9f9f]">
                                            <LocationOnIcon color='inherit' fontSize='medium'/>
                                            <span className='text-sm '>
                                                Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-start items-center gap-3 text-[#9f9f9f]">
                                            <LocationOnIcon color='inherit' fontSize='medium'/>
                                            <span className='text-sm '>
                                                1900.636.099
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-start items-center gap-3 text-[#9f9f9f]">
                                            <LocationOnIcon color='inherit' fontSize='medium'/>
                                            <span className='text-sm '>
                                                1900.636.099
                                            </span>
                                        </div>
                                        <div className="flex flex-row justify-start items-center gap-3 text-[#9f9f9f]">
                                            <LocationOnIcon color='inherit' fontSize='medium'/>
                                            <span className='text-sm '>
                                                hi@haravan.com
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                            <hr style={{borderTop: '0.5px solid #9f9f9f'}}/>
                        </div>
                        <div className="px-3" onClick={() => handleOpenContentFooter(4)}>
                            <div className="w-full flex justify-between items-center py-3">
                                <span className="text-[#9f9f9f]">
                                    FANPAGE
                                </span>
                                {
                                    activeTab === 4 ? (<>
                                        <span><ArrowDropUpIcon className="text-lg text-[#9f9f9f]"/></span>
                                    </>) : (
                                        <span><ArrowDropDownIcon className="text-lg text-[#9f9f9f]" /></span>
                                        
                                    )
                                }
                            </div>
                            {
                                activeTab === 4 && (
                                    <div className='mt-2 pb-4'>
                                        <FacebookEmbed url={'https://www.facebook.com/andrewismusic/posts/451971596293956'} width={267} height={150}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </section>
    )
}