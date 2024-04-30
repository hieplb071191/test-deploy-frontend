'use client'
import CartItem from "@/components/cart/cartItem";
import BannerCaurosel from "@/components/caurosel/banner-caurosel";
import CustomImage from "@/components/image/custom-image";
import { post, get } from '@/api/api-service'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useFetch from "@/hooks/useFetch";
import convertdataProduct from "@/utils/convert-data-product.util";
import AnnimationImage from "@/components/image/annimation-image";
import NewsItem from "@/components/news/news-item";

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
  const token = useSelector((state: RootState) => state.token.token)
  const [hotProduct, setHotProduct] = useState<any[]>([])
  const [newHotProduct, setNewsHotProduct] = useState<any[]>([])
  console.log(process.env.BACKEND_URL)
  useEffect(() => {
    get('product-public/product', {page: 1, perPage: 8}, token).then(res => {
      console.log('res', res.data.rows)
      if (res.data?.rows?.length) {
        setHotProduct(convertdataProduct(res.data.rows))
        setNewsHotProduct(prev => {
          return [
            ...convertdataProduct(res.data.rows),
          ]
        })
      }
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
            md:grid-cols-3 
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
      <section className="m-auto sx:w-full xl:container xl:mt-48 2xl:mt-60 container">
        <div className="flex flex-col justify-center items-center mb-4">
            <span className="font-semibold text-3xl font-sans">
              Sản phẩm mới
            </span>
            <span className="font-light text-base font-sans">
              Cập nhật những sản phẩm mới nhất
            </span>
        </div>
        <div className="grid sx:grid-cols-1 2sx:grid-cols-2 mx:grid-cols-3 xl:grid-cols-4  mt-4 mb-4">
          {
            hotProduct.map((item,index) => (
              <CartItem 
                listImage={item.listImage} 
                price={item.price} 
                id={item.id} 
                name={item.name} 
                imageHover={item.imageHover} 
                key={index}
                discount={item.discount}
              />
            ))
          }
        </div>
        <div className="container mx-auto grid sx:grid-cols-1 xl:grid-cols-2  sx:p-4 sx:gap-4 xl:gap-7 my-6">
          <div className="flex flex-col justify-start sx:gap-4 xl:gap-7 w-full h-full">
              <div className="w-full xl:min-h-[271px]">
                <AnnimationImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_center_1.jpg?v=164'} />
              </div>
              <div className="w-full xl:min-h-[271px]">
                <AnnimationImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_center_2.jpg?v=164'} />
              </div>
          </div>

          <div className="w-full h-full">
                <AnnimationImage imageUrl={'https://theme.hstatic.net/1000406172/1000655826/14/img_banner_center_3.jpg?v=164'} />
            </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-8 mb-4">
            <span className="font-semibold text-3xl font-sans">
              Sản phẩm bán chạy
            </span>
            <span className="font-light text-base font-sans">
              Cập nhật những sản phẩm bán chạy
            </span>
        </div>
        <div className="sx:w-full xl:container overflow-x-auto mx-auto p-3">
          <div className="sx:w-[1360px] xl:w-full grid grid-cols-4  mt-4 mb-4">
            {
              newHotProduct.map((item,index) => (
                <CartItem 
                  listImage={item.listImage} 
                  price={item.price} 
                  id={item.id} 
                  name={item.name} 
                  imageHover={item.imageHover} 
                  key={index}
                  discount={item.discount}
                  isHorizontal={true}
                />
              ))
            }
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-3">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <span className="font-semibold text-3xl font-sans">
              Tin tức
            </span>
            <span className="font-light text-base font-sans">
              Cập nhật tin tức mới nhất
            </span>
          </div>
          
          <div className="sx:w-full xl:container grid sx:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              <NewsItem title={"Muốn sexy, hãy học cách chinh phục short jeans!"} lstContent={"Ai bảo cứ phải bikini mới là tuyệt đỉnh của mùa hè? Short jeans có khi còn làm tốt hơn"} imageTheme={"https://file.hstatic.net/1000406172/article/123_9bc2ca2b53b74948b193fb16698e9c38_large.png"} id={"fasdf-fasdf-fasdf-fdfv"}  />
              <NewsItem title={"Muốn sexy, hãy học cách chinh phục short jeans!"} lstContent={"Ai bảo cứ phải bikini mới là tuyệt đỉnh của mùa hè? Short jeans có khi còn làm tốt hơn"} imageTheme={"https://file.hstatic.net/1000406172/article/123_9bc2ca2b53b74948b193fb16698e9c38_large.png"} id={"fasdf-fasdf-fasdf-fdfv"}  />
              <NewsItem title={"Muốn sexy, hãy học cách chinh phục short jeans!"} lstContent={"Ai bảo cứ phải bikini mới là tuyệt đỉnh của mùa hè? Short jeans có khi còn làm tốt hơn"} imageTheme={"https://file.hstatic.net/1000406172/article/123_9bc2ca2b53b74948b193fb16698e9c38_large.png"} id={"fasdf-fasdf-fasdf-fdfv"}  />
          </div>
        </div>
      </section>
    </main>
  );
}
