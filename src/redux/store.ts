import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";


export const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: (getDefultMiddlware) => getDefultMiddlware().concat(goodsApi.middleware)
})