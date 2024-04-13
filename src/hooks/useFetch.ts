import { useEffect, useState } from "react"
import { post, get } from '../api/api-service'
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { AxiosError } from "axios"
import { logout } from "@/redux/slices/token.slice"
import {  useRouter  } from 'next/navigation'



export default function useFetch(
    url: string,
    method: string,
    params: any | any[],
    token = ''
){
    const router = useRouter()
    const [data,setData] = useState<any>(null)
    const [error,setError] = useState<any>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const dispatch = useDispatch<ThunkDispatch<any, any, any> | any>()
    useEffect(()=>{
        (
            async function(){
                switch (method) {
                    case 'GET':
                        await getData()
                        break;
                    case 'POST':
                        await postData()
                        break;
                    default:
                        setData(null)    
                }
            }
        )()
        return
    },[])

    async function getData (){
        try {
            const res = await get(url, params, token)
            setData(res.data)
        } catch(err: AxiosError | any) {
            if (err?.response?.status === 401) {
                dispatch(logout())
                router.replace('/login')
            }
            setError(err)
            
        } finally {
            setLoading(false)
        }
    }

    async function postData (){
        try {
            const res = await post(url, params, token)
            setData(res.data)
        } catch(err) {
            setError(err)
            
        } finally {
            setLoading(false)
        }
    }
   return { data, error, loading }
}