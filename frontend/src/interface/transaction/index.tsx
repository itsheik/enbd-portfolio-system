import { type ApiRequestParams, type ApiResponse } from '..'

export interface TransactionData {
   orderRefNo: string
   securityName: string
   transactionType: string
   fromDate: string
   toDate: string
   transactionDate: string
   transactionAmount: number
}

export type TransactionDataReponse = ApiResponse<TransactionData[]>
export type TransactionDataRequest = ApiRequestParams
