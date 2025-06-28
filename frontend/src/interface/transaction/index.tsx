import { type ApiRequestParams, type ApiResponse } from '..'

export interface TransactionData {
   userid: number
   username: string
   token: string
}

export type TransactionDataReponse = ApiResponse<TransactionData>
export type TransactionDataRequest = ApiRequestParams
