import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {authApi} from "./auth/auth.api";
import {authReducer} from "./auth/auth.slice";
import {cvApi} from "./cv/cv.api";
import {commonApi} from "./common/common.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cvApi.reducerPath]: cvApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    authApi.middleware,
    cvApi.middleware,
    commonApi.middleware
  )
})

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>