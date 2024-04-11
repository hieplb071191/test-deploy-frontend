import { post } from "@/api/api-service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk('/login', async (params: Record<string, any>, thunkApi) => {

    const data = await post('auth/login-with-password', params)
    return data?.data?.access_token
    
})