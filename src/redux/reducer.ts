import { combineReducers } from '@reduxjs/toolkit';
import tokenSlice from './slices/token.slice';
import productQuery from './slices/product-query.slice';

('./slices/token.slice');

const rootReducer = combineReducers({
    token: tokenSlice,
    productQuery: productQuery
});

export { rootReducer };
