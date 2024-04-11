import axios from "axios";
import { error } from "console";


const client = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3001/api/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

client.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if (window?.localStorage) {
            window.localStorage.clear()
        }
        console.log(error.response.status)
    }
)

export const post = (url: string, params?: Record<string, any>, token = '') => {
    return client.post(url, params, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const get = (url: string, query?: Record<string, any>,  token = '') =>{
    return client.get(url, {params: query, 
        headers: {
        Authorization: `Bearer ${token}`
    }})
}