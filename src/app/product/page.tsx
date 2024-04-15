'use client'

import { get } from "@/api/api-service"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Production() {

    const router = useRouter()
    const query = useSelector((state: RootState) => state.productQuery.query)
    const [queryData, setQueryData] = useState(query)
    const token = useSelector((state: RootState) => state.token.token)
    useEffect(() => {
        setQueryData(query)
    }, [query])

    const getProduct = async (query: Record<string, any>) => {
        try {
            const result = await get('product-admin/product',query, token)
            return result
        } catch (e) {
            console.log(e)
            return null
        }
    }

    useEffect(() => {
        getProduct(queryData).then(res => console.log(res)).catch((e) =>console.log(e))
    }, [query])

    return (
        <section className="w-full">
            <div className="w-full h-9 bg-gray-200 px-3">
                <div className="xl:container flex justify-start items-center h-full mx-auto">
                    <span className="text-sm text-gray-700">
                        Trang chủ / danh mục/ sản phẩm
                    </span>
                </div>
            
            </div>
            <div className="w-full h-auto mb-6">
                <img src="https://file.hstatic.net/1000406172/collection/col3_05e1425980eb4115856379d068f125cb.jpg" alt="image_banner_product" />
            </div>
        </section>
    )
}