'use client'
//REDUX-TOOLKIT
import { type TypedUseSelectorHook,useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// REDUX-PERSIST
import { persistReducer, persistStore } from 'redux-persist'

import storage from './storage'

import auctionReducer from '~/store/features/auction/auctionSlice'
import authReducer from '~/store/features/auth/authSlice'
import retailFilterSlice from '~/store/features/filters/RetailFilterSlice'
import generalSlice from '~/store/features/general/generalSlice'
import retailReducer from '~/store/features/retail/retailSlice'
import { apiSlice } from '~/store/services/apiSlice'

const rootReducer = combineReducers({
   [apiSlice.reducerPath]: apiSlice.reducer,
   user: authReducer,
   retail: retailReducer,
   auction: auctionReducer,
   retailFilter: retailFilterSlice,
   general: generalSlice,
})

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
   blacklist: ['auction'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
