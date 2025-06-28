export interface ApiResponse<T> {
   success: boolean
   statusCode: number
   message: string
   payload: T
}
export interface ApiResponseWithData<T> {
   success: boolean
   statusCode: number
   message: string
   payload: {
      data: T
   }
}

export interface ISelectLabel {
   label: string
   value: string
}
