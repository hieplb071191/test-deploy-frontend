import { createSlice } from "@reduxjs/toolkit"

interface PropStateType {
    cart: Record<string, any> | null
}

const initialState: PropStateType = {
    cart: null
}

const cart = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        resetCart: (state) => {
            state.cart = null
        }
    }
})

const { actions, reducer } = cart
export const {
    setCart,
    resetCart,
} = actions

export default reducer