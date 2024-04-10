import { loginThunk } from './../thunks/login.thunk';
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";



const tokenReducer = createSlice({
    name: 'token',
    initialState: {
        token: '',
        isLoading: true
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.isLoading = true
        }),

        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload
        })
    }
})
export const {
    setToken,
} = tokenReducer.actions
export default tokenReducer.reducer