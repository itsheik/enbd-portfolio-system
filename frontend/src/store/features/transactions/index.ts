import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type TransactionData } from '@/src/interface/transaction'

export type TransactionState = {
   transactionData: TransactionData[] | null
}

const initialState: TransactionState = {
   transactionData: null,
}

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
