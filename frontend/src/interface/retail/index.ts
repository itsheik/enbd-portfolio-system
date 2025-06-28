import { type LoadCountriesData } from '../general'

import { type ApiResponseWithData } from './../index'

export interface RetailWineListingData {
   total: number
   retail: Retail[]
   country: Country[]
   region: Region[]
   type: Type[]
   vintage: Vintage[]
   rating: Rating[]
   bottleSize: BottleSize[]
   price: Price[]
}

export interface RetailWineListingFiltersData {
   country: Country[]
   filteredCountries?: LoadCountriesData[]
   region: Region[]
   type: Type[]
   vintage: Vintage[]
   rating: Rating[]
   bottleSize: BottleSize[]
   price: Price[]
}

export interface Retail {
   winecatalogid: number
   winename: string
   vintage: string
   bottlesize: string
   country: string
   region: string
   subregion: string
   type: string
   varietal: string
   maindescription: string
   price: number
   available: number
   staffreview: string
   score: string
   reviewer: string
   review: string
   imagethumb: string
   imagenormal: string
   imageoriginal: string
   synonym: string
}

export interface Country {
   count: number
   value: string
}

export interface Region {
   count: number
   value: string
}

export interface Type {
   count: number
   value: string
}

export interface Vintage {
   count: number
   value: string
}

export interface Rating {
   count: number
   value: string
}

export interface BottleSize {
   count: number
   value: string
}

export interface Price {
   count: number
   from: number
   to: number
}

export type FetchRetailWineListingDataReponse = ApiResponseWithData<RetailWineListingData>
export type FetchRetailWineListingDataRequest = {
   LotPageSize?: string
   PageIndex?: number
   Type?: string
   Country?: string
   Region?: string
   SubRegion?: string
   BottleName?: string
   Vintage?: string
   Score?: string
   Keyword?: string
   Collection?: string
   SortExpression?: string
   SortOrder?: string
   PriceFrom?: string
   PriceTo?: string
   sale?: boolean
}

export interface AddRetailItemToCart {
   succeded: boolean
   message: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   identity: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   transIdentity: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   methodName: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   oReturn: any
}

export type AddRetailItemToCartResponse = ApiResponseWithData<AddRetailItemToCart>
export type AddRetailItemToCartRequest = {
   cartId: string
   winecatalogid: number
   quantity: number
   amount: number
}

export type RemoveRetailItemToCart = AddRetailItemToCart

export type RemoveRetailItemToCartResponse = ApiResponseWithData<RemoveRetailItemToCart>
export type RemoveRetailItemToCartRequest = {
   cartId: string
   winecatalogid: number
   quantity: number
   amount: number
}

export type RemoveRetailItemFromOrder = AddRetailItemToCart
export type RemoveRetailItemFromOrderResponse = ApiResponseWithData<RemoveRetailItemFromOrder>
export type RemoveRetailItemFromOrderRequest = {
   orderID: number
   wineCatalogId: number
}

export interface Cart {
   wineCatalogID: number
   price: number
   totalPrice: number
   quantity: number
   wineName: string
   vintage: string
   bottleSize: string
   varietal: string
   region: string
   subRegion: string
   imagethumb: string
}
export interface CartSubtotal {
   items: number
   subTotal: number
}

export interface IRetailCart {
   cartItems: Cart[]
   cartSubtotal: number
}

export interface GetUserRetailCart {
   cart: Cart[]
   cartSubtotal: CartSubtotal[]
}

export type GetUserRetailCartResponse = ApiResponseWithData<GetUserRetailCart>
export type GetUserRetailCartRequest = {
   cartId: string
}

export interface GetPaymentSummary {
   cart: Cart[]
   lblSubTotal: string
   lblTax: string
   lblTotal: string
}

export interface ShippingOptions {
   ShippingType: string
   ShippingPrice: string
   ShippingDay: string
}

export type GetPaymentSummaryResponse = ApiResponseWithData<GetPaymentSummary>
export type GetPaymentSummaryRequest = {
   cartId: string
   shippingCountry?: string
   shippingState?: string
   shippingType: string
   shippingVal: number
}

export interface BillingAddress {
   id: number
   address1: string
   address2: string
   city: string
   state: string
   zip: string
   countryCodeID: number
   countryName: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   country: any
}

export interface ShippingAddress {
   id: number
   address1: string
   address2: string
   city: string
   state: string
   zip: string
   countryCodeID: number
   countryName: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   country: any
}

export interface Facility {
   createdDate: string
   createdByID: number
   fullName: string
   addressID: number
   phone: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   internationalPhone: any
   fax: string
   email: string
   url: string
   imageURLLocation: string
   imageFileLocation: string
   smtpServer: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   twitterUsername: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   twitterPassword: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   liveBiddingMessage: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   liveBiddingProcess: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   internetBiddingProcess: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   gatewayUser: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   gatewayVendor: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   gatewayPartner: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   gatewayPassword: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   bidLimitEmail: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   emailBackgroundColor: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   companyMessage: any
   activeInd: boolean
   id: number
   shortName: string
}

export interface NoticeOption {
   facilityID: number
   customerID: number
   bidNotice: boolean
   outBidNotice: boolean
   newAuctionNotice: boolean
   auctionClosingNotice: boolean
   newOrderNotice: boolean
   orderShippedNotice: boolean
   bidAutoWatchlistNotice: boolean
   paymentNotice: boolean
}

export type FetchCustomerInfo = {
   id: number
   customerID: number
   createdDate: string
   createdByID: number
   salesPersonID: number
   salesPersonName: string
   company: string
   lastName: string
   firstName: string
   middleInitial: string
   title: string
   homePhone: string
   officePhone: string
   officePhoneExt: string
   mobilePhone: string
   shippingPhone: string
   emailAddress: string
   billingAddress: BillingAddress
   shippingAddress: ShippingAddress
   website: string
   userName: string
   password: string
   bidLimit: number
   creditLimit: number
   deceased: boolean
   allowBidsOnConsignedLots: boolean
   disableCreditCards: boolean
   dealerLicenseNumber: string
   sourceID: number
   sourceNotes: string
   activeInd: boolean
   fax: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ipAddress: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   searchLocations: any
   shippingType: number
   consolType: number
   shipOWC: boolean
   shipOCC: boolean
   paymentID: number
   defaultPaymentID: number
   billingAddressID: number
   shippingAddressID: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   addresses: any[]
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   notes: any[]
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   types: any[]
   facilities: Facility[]
   noticeOptions: NoticeOption[]
}

export type FetchCustomerInfoResponse = ApiResponseWithData<FetchCustomerInfo>
export type FetchCustomerInfoRequest = void

export type DeleteCustomerAddress = string

export type DeleteCustomerAddressResponse = ApiResponseWithData<DeleteCustomerAddress>
export type DeleteCustomerAddressRequest = {
   addressIds: number
}

export interface Address {
   Address1: string
   Address2: string
   City: string
   State: string
   Zip: string
   CountryCodeID: number
}

export type AddCustomerAddress = string

export type AddCustomerAddressResponse = ApiResponseWithData<AddCustomerAddress>
export type AddCustomerAddressRequest = {
   Address: Address
   IsShippingAddress: boolean
   IsBillingAddress: boolean
}

export type UpdateCustomerAddress = string

export type UpdateCustomerAddressResponse = ApiResponseWithData<UpdateCustomerAddress>
export type UpdateCustomerAddressRequest = {
   Address: Address & {
      ID: number
   }
   IsShippingAddress: boolean
   IsBillingAddress: boolean
}

export type FetchCustomerPaymentMethods = {
   id: number
   name: string
   profileID: number
   paymentID: number
   type: string
   billingAddressID: number
   billingAddress: string
   billingZip: string
   defaultInd: number
}

export type FetchCustomerPaymentMethodsResponse = ApiResponseWithData<FetchCustomerPaymentMethods[]>
export type FetchCustomerPaymentMethodsRequest = void

export type FetchShippingRates = {
   newCost: number
   serviceType: string
}

export type FetchShippingRatesResponse = ApiResponseWithData<FetchShippingRates[]>
export type FetchShippingRatesRequest = {
   cartId: string
   shippingCountry: string
   shippingState: string
}

export interface CompleteOrderBillingAddress {
   Address1: string
   Address2: string
   City: string
   State: string
   Zip: string
   Country: string
}

export interface CompleteOrderShippingAddress {
   Address1: string
   Address2: string
   City: string
   State: string
   Zip: string
   Country: string
}

export type CompleteOrder = ''

export type CompleteOrderResponse = ApiResponseWithData<CompleteOrder>
export type CompleteOrderRequest = {
   StoredPaymentID: number
   CartID: string
   firstName: string
   lastName: string
   emailAddress: string
   mobilePhone: string
   countryCodeID: number
   state: string
   address1: string
   address2: string
   city: string
   zip: string
   shippingPhoneNumber: string
   shpCountryCodeID: number
   shpState: string
   shpAddress1: string
   shpAddress2: string
   shpCity: string
   shpZip: string
   CreditCardNumber: string
   CreditCardType: string
   ExpirationMonth: string
   ExpirationYear: string
   SecurityCode: string
   BillingAddress: CompleteOrderBillingAddress
   ShippingAddress: CompleteOrderShippingAddress
   serviceType: string
   ShippingType: string
   ShippingAmount: number
   shipDate: string
   WeatherPreference: string
   Amount: string
}
