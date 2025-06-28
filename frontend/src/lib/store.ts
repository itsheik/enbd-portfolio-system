'use client'
//REDUX-TOOLKIT
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// REDUX-PERSIST
import { persistReducer, persistStore } from 'redux-persist'

import storage from './storage'

import authReducer from '~/store/features/auth/authSlice'
import transactionReducer from '~/store/features/transactions'
import { apiSlice } from '~/store/services/apiSlice'

const rootReducer = combineReducers({
   [apiSlice.reducerPath]: apiSlice.reducer,
   user: authReducer,
   transactions: transactionReducer,
})

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
   blacklist: [''],
   whitelist: [''],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
