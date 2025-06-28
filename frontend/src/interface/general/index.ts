import { type ApiResponseWithData } from './../index'

export interface LoadCountriesData {
   iD_PK: number
   name: string
   countryCode: string
}

export type LoadCountriesDataReponse = ApiResponseWithData<LoadCountriesData[]>
export type LoadCountriesDataRequest = void

export interface LoadStatesData {
   iD_PK: number
   createDate: string
   createdByID_FK: number
   countryID_FK: number
   name: string
   nameShort: string
   activeInd: boolean
}

export type LoadStatesDataReponse = ApiResponseWithData<LoadStatesData[]>
export type LoadStatesDataRequest = {
   countryId: number
}
