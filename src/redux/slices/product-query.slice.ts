import { createSlice } from "@reduxjs/toolkit"


interface propStateType {
    query: Record<string, any>
}

const initialState: propStateType = {
    query: {

    }
}

const productQuery = createSlice({
    name: 'productQuery',
    initialState: initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        },

        resetQuery: (state) => {
            state.query = initialState
        }
    }
})

const { actions, reducer } = productQuery
export const {
    setQuery,
    resetQuery,
} = actions

export default reducer