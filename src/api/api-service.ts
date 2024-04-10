import axios from "axios";

const token = localStorage?.getItem('token')

const client = axios.create({
    baseURL: process.env.BACKEND_URL || 'https://lehiep-dev.xyz/api/',
    headers: {
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json"
    }
    
})

export const post = (url: string, params?: Record<string, any>) => {
    return client.post(url, params)
}

export const get = (url: string, query?: Record<string, any>) =>{
    return client.get(url, {params: query})
}