import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvb2QuYm95LjA5OTFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiTGUiLCJsYXN0TmFtZSI6IkhpZXAiLCJhZGRyZXNzIjp7InNwZWNpYWxBZGRyZXNzIjoiV2VzdCIsImxhdCI6LTMyLjYzNjgsImxvbmciOi0xNS4zODA4fSwiY3JlYXRlZEF0IjoiMjAyNC0wMy0zMFQxNDo0Mzo0My4zMDJaIiwidXBkYXRlZEF0IjoiMjAyNC0wMy0zMFQxNDo0Mzo0My4zMDJaIiwiaWQiOiIzMWIzN2FkMS05OGY0LTQ2ZjgtOWE4NS1hMjAxNzU1NTNmOGYiLCJfaWQiOiIzMWIzN2FkMS05OGY0LTQ2ZjgtOWE4NS1hMjAxNzU1NTNmOGYiLCJpYXQiOjE3MTI0ODkyMjQsImV4cCI6MTcxMjU3NTYyNH0.93XeAGmHMw33EAmkUeQvoPlerNL7jLjRIIEPS8dzoWs'

const client = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3001/api/',
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