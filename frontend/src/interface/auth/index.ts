import { type ApiResponse } from './../index'

export interface LoginData {
   userid: number
   username: string
   token: string
}

export type LoginDataReponse = ApiResponse<LoginData>
export type LoginDataRequest = {
   username: string
   password: string
}

export interface SignupData {
   userid: number
   username: string
   token: string
}

export interface Customer {
   FirstName: string
   LastName: string
   Company: string
   HomePhone: string
   OfficePhone: string
   MobilePhone: string
   UserName: string
   Password: string
   EmailAddress: string
   SourceID: number
   SourceNotes: string
}

export interface Address {
   Address1: string
   Address2: string
   City: string
   State: string
   Zip: string
   CountryCodeID: number
}

export type SignupDataReponse = ApiResponse<SignupData>
export type SignupDataRequest = {
   Customer: Customer
   Address: Address
   CaptchaResponse: string
}

export type UserBillingShippingInfo = {
   firstName: string
   lastName: string
   email: string
   promoCode: string
   shipping_phone: string
   shipping_country: string
   shipping_primaryAddress: string
   shipping_secondaryAddress: string
   shipping_city: string
   shipping_state: string
   shipping_zip: string
   billing_country: string
   billing_primaryAddress: string
   billing_secondaryAddress: string
   billing_city: string
   billing_state: string
   billing_zip: string
   mobile: string
   phone: string
   source: number
}
