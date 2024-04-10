import { createSlice } from "@reduxjs/toolkit";


const tokenReducer = createSlice({
    name: 'token',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})
export const {
    setToken
} = tokenReducer.actions
export default tokenReducer.reducer