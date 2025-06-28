import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import { PAGE_ROUTES } from '@/src/constants/page-constants'
import { type LoginData, type UserBillingShippingInfo } from '@/src/interface/auth'
import { type FetchCustomerInfo } from '@/src/interface/retail'
import storage from '@/src/lib/storage'
import { type AppDispatch } from '@/src/lib/store'

import {
   getAccessTokenFromCookie,
   getUserFromCookie,
   removeAccessTokenCookie,
   removeCartId,
   removeRefreshTokenCookie,
   removeUserCookie,
   setAccessTokenCookie,
   setUserCookie,
} from '~/utils/storage/protectedStorage'

export type TAction = 'all' | 'create' | 'read' | 'update' | 'delete'

export type IUser = LoginData

export interface UserSliceState {
   token: IUser['token'] | null
   userId: IUser['userid'] | null
   userName: IUser['username'] | null
   loggingOut: boolean
   customerInfo: FetchCustomerInfo | null
   customerBillingShippingInfo: UserBillingShippingInfo | null
}

const userCookie = getUserFromCookie()

const initialState: UserSliceState = {
   token: getAccessTokenFromCookie() || null,
   userId: userCookie?.userId || null,
   userName: userCookie?.userName || null,
   loggingOut: false,
   customerInfo: null,
   customerBillingShippingInfo: null,
}

// Clean initial state for reset operations (no cookie dependencies)
const cleanInitialState: UserSliceState = {
   token: null,
   userId: null,
   userName: null,
   loggingOut: false,
   customerInfo: null,
   customerBillingShippingInfo: null,
}

// Create a root reset action
export const resetStore = createAction('RESET_STORE')

// Thunk action for logout that clears both auth and retail slices
export const logoutUser = () => (dispatch: AppDispatch) => {
   console.log('logoutUser thunk called')
   
   // Clear all storage first
   localStorage.clear()
   removeAccessTokenCookie()
   removeRefreshTokenCookie()
   removeCartId()
   removeUserCookie()
   
   // Dispatch resetStore first to clear all slices
   console.log('dispatching resetStore first')
   dispatch(resetStore())
   
   // Then dispatch setLogout for auth-specific cleanup and redirect
   console.log('now dispatching setLogout')
   dispatch(setLogout())
   
   console.log('logoutUser thunk completed')
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setLogIn: (state, action: PayloadAction<LoginData>) => {
         setAccessTokenCookie(action.payload.token)
         setUserCookie({
            userId: action.payload.userid,
            userName: action.payload.username,
            token: action.payload.token,
         })
         // setRefreshTokenCookie(JSON.stringify(action.payload.token.refreshToken))

         // window.location.href = PAGE_ROUTES.ROOT

         return {
            ...state,
            token: action.payload.token,
            // refreshToken: action.payload.token.refreshToken,
            userName: action.payload.username,
            userId: action.payload.userid,
            loggingOut: false,
         }
      },
      setUser: (state, action: PayloadAction<IUser | null>) => {
         return {
            ...state,
            user: action.payload,
         }
      },

      setUserSlice: (state, action: PayloadAction<Partial<UserSliceState>>) => {
         return {
            ...state,
            ...action.payload,
         }
      },

      setLogout: (state, action: PayloadAction<void>) => {
         // Storage is already cleared in the thunk, so just handle state and redirect
         window.location.href = PAGE_ROUTES.AUTH.LOGIN

         return {
            ...state,
            customerInfo: null,
            token: null,
            userId: null,
            userName: null,
            loggingOut: true,
         }
      },
      setLogoutLoading: (state, action: PayloadAction<boolean>) => {
         return {
            ...state,
            loggingOut: action.payload,
         }
      },
   },
   extraReducers: builder => {
      builder.addCase(resetStore, (state, action) => {
         console.log('Auth slice: resetStore action received', action)

         return cleanInitialState
      })
   },
})

// Nested persist configuration for the 'user' slice
const userPersistConfig = {
   key: 'user', // Key for the nested persistence
   storage,
   whitelist: [''], // Only persist the 'customerBillingShippingInfo' key
}

// Wrap the user reducer with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer)

export const { setLogIn, setLogout, setUser, setUserSlice, setLogoutLoading } = userSlice.actions
export const selectUserSlice = (state: { user: UserSliceState }) => state.user

export default persistedUserReducer
