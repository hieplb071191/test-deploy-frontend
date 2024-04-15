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
        },
        logout(state) {
            state.token = ''
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginThunk.pending, (state) => {
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
const { actions, reducer } = tokenReducer
export const {
    setToken,
    logout,
} = actions
export default reducer
