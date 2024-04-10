import { thunk } from 'redux-thunk';
import { post } from "@/api/api-service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk('auth/login', 
    async (params: any, thunkApi
    ) => {
        try {
            const token = await post('/auth/login-with-password', params)
            return token?.data?.access_token
        } catch (e) {
            console.log(e) 
            return null
        }
    }
)