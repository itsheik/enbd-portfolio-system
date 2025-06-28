import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type LoginData } from '@/src/interface/auth'

export type IUser = LoginData

// export interface TransactionState {

// }

const initialState: any =
   // TransactionState
   {}

const transactionSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setTransactionSlice: (state, action: PayloadAction<Partial<any>>) => {
         return {
            ...state,
            ...action.payload,
         }
      },
   },
})

export const { setTransactionSlice } = transactionSlice.actions
export const selectTransactionSlice = (state: { user: TransactionState }) => state.user

export default transactionSlice.reducer
