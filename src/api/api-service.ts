import axios from "axios";
import { bindActionCreators } from 'redux'



const client = axios.create({
    baseURL: process.env.BACKEND_URL || 'https://lehiep-dev.xyz/api/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})


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