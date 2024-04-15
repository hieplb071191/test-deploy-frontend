import LocationOnIcon from '@mui/icons-material/LocationOn';

import { FacebookEmbed } from 'react-social-media-embed';

export default function FooterPc () {
    return (
        <section className="sx:hidden xl:block w-full bg-slate-800">
            <div className="flex container justify-around gap-6 w-full mx-auto px-3 py-5">
                <div className="flex flex-col justify-start items-start">
                    <span className="font-sans text-white text-xl">Giới thiệu</span>
                    <span className="text-white font-sans text-sm max-w-80 mt-6">
                        K&M Style trang mua sắm trực tuyến của thương hiệu thời trang Lama, thời trang nam, nữ, phụ kiện, giúp bạn tiếp cận xu hướng thời trang mới nhất.
                    </span>
                    <div className="mt-4">
                        <img 
                            data-src='https://theme.hstatic.net/1000406172/1000655826/14/logo_bct.png?v=164' 
                            src='https://theme.hstatic.net/1000406172/1000655826/14/logo_bct.png?v=164' 
                            width={200}
                            height={76}
                        />
                    </div>
                </div>
                <div>
                    <span className="font-sans text-white text-xl">Liên kết</span>
                    <div className="flex flex-col gap-3 mt-6 text-white text-sm">
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
                </div>
                <div>
                    <span className="font-sans text-white text-xl">Thông tin liên hệ</span>
                    <div className="flex flex-col mt-6 w-[267px] gap-3">
                        <div className="flex flex-row justify-start items-center gap-3 text-white">
                            <LocationOnIcon color='inherit' fontSize='medium'/>
                            <span className='text-sm '>
                                Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
                            </span>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 text-white">
                            <LocationOnIcon color='inherit' fontSize='medium'/>
                            <span className='text-sm '>
                                1900.636.099
                            </span>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 text-white">
                            <LocationOnIcon color='inherit' fontSize='medium'/>
                            <span className='text-sm '>
                                1900.636.099
                            </span>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-3 text-white">
                            <LocationOnIcon color='inherit' fontSize='medium'/>
                            <span className='text-sm '>
                                hi@haravan.com
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="font-sans text-white text-xl">Fanpage</span>
                    <div className='mt-6'>
                        <FacebookEmbed url={'https://www.facebook.com/andrewismusic/posts/451971596293956'} width={267} height={150}/>
                    </div>
                </div>
            </div>
            
        </section>
    )
}