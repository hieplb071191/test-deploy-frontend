'use client'
import CartItem from "@/components/cart/cartItem";
import BannerCaurosel from "@/components/caurosel/banner-caurosel";
import CustomImage from "@/components/image/custom-image";
import { post, get } from '@/api/api-service'
import { useEffect, useState } from "react";
const bannerCauroselProp= [
    {
      image: 'https://theme.hstatic.net/1000406172/1000655826/14/slideshow_1.jpg?v=164',
      id: 'header-banner'
    },
    {
      image: 'https://theme.hstatic.net/1000406172/1000655826/14/slideshow_2.jpg?v=164',
      id: 'header-banner'
    },
    {
      image: 'https://theme.hstatic.net/1000406172/1000655826/14/slideshow_3.jpg?v=164',
      id: 'header-banner'
    },
]



export default function Home() {
  const [hotProduct, setHotProduct] = useState<any[]>([])
  console.log(process.env.BACKEND_URL)
  useEffect(() => {
    get('product-admin/product', {page: 1, perPage: 8}).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    }) 
  }, [])

  return (
    <main >
      <section className="relative">
        <BannerCaurosel datas={bannerCauroselProp} propId={"header-banner"} />
        <div className="
            grid 
            sx:grid-cols-1 
            sx:w-full
            sx:left-0 
            sx:-translate-x-0
            sx:relative
            xl:container 
            xl:absolute 
            xl:grid-cols-3 
            bg-white 
            xl:left-1/2 
            xl:-translate-x-1/2 
            xl:h-72  
            xl:-bottom-36
            gap-6 
            p-6">
          <CustomImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_home_1.jpg?v=164'}/>
          <CustomImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_home_2.jpg?v=164'}/>
          <CustomImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_home_3.jpg?v=164'}/>
        </div>
      </section>
      <section className="m-auto xl:mt-48 2xl:mt-60 container">
        <div className="flex flex-col justify-center items-center mb-4">
            <span className="font-semibold text-xl font-sans">
              Sản phẩm mới
            </span>
            <span className="font-light text-base font-sans">
              Cập nhật những sản phẩm mới nhật
            </span>
        </div>
        <div className="grid sx:grid-cols-2 xl:grid-cols-4 mt-4 mb-4">
          <CartItem 
            listImage={[
              'https://product.hstatic.net/1000406172/product/623_800x_8af64c9947ba42a2a80d2b8ed67d01d4_large.jpg',
              'https://product.hstatic.net/1000406172/product/1000_800x_1e2c9c812a33429eab8daf93967506b5_large.jpg',
              'https://product.hstatic.net/1000406172/product/1005_800x_5326680ba7894290bc556e7b1c4e2d04_large.jpg',

            ]} 
            price={350000} 
            id={"asnda-fsadf-423-vxcgvxc"} 
            quantity={10} 
            name={"Áo thun len tay dài KM4"}
            discount={{
              type: 'percent',
              value: 15
            }}
            imageHover={'https://product.hstatic.net/1000406172/product/620_800x_b4eacb4c96924d26b1b6e24008d9005c_large.jpg'}
          />
        </div>
      </section>
    </main>
  );
}
