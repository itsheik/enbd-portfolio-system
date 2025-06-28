import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TransactionState = object

const initialState: TransactionState = {}

const transactionSlice = createSlice({
   name: 'transaction',
   initialState,
   reducers: {
      setTransactionSlice: (state, action: PayloadAction<Partial<TransactionState>>) => {
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
