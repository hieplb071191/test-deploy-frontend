'use client';
import { useParams  } from 'next/navigation'


export default function ProductDetailPage () {
    const  params  = useParams()
    console.log(params)
    return (
        <div>
            ProductDetail
        </div>
    )
}