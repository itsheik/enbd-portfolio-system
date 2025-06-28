import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TransactionState = object

const initialState: TransactionState = {}

const transactionSlice = createSlice({
   name: 'transactions',
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
export const selectTransactionSlice = (state: { transactions: TransactionState }) => state.transactions

export default transactionSlice.reducer
