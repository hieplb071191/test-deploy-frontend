import { get } from "@/api/api-service"

export async function generateStaticParams() {
    const result = await get('/product-public/product') 
    const products = result.data?.rows || []
    return products.map((product: any) => ({
        slug: product._id,
      }))
}

export default function Page ({ params }: { params: { slug: string } }) {
    return (
        <div>
            ProductDetail
        </div>
    )
}