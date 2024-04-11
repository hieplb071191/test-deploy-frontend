import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/login.thunk";
import { Pending } from "@mui/icons-material";


const tokenReducer = createSlice({
    name: 'token',
    initialState: {
        token: '',
        loading: false,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginThunk.pending, (state, action) => {
            state.loading = true
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload
            state.loading = false
        })
        .addCase(loginThunk.rejected, (state) => {
            state.loading = false
        })

    }
})
export const {
    setToken
} = tokenReducer.actions
export default tokenReducer.reducer