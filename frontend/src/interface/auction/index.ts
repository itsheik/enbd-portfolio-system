import { type ApiResponseWithData } from './../index'

export interface AuctionHighlightsData {
   total: number
   auctionLots: Auction[]
   country: Country[]
   region: Region[]
   type: Type[]
   vintage: Vintage[]
   rating: Rating[]
   bottleSize: BottleSize[]
   price: Price[]
}

export interface Auction {
   lotid: number
   inventoryid: number
   internetheading: string
   maindescription: string
   condition: string
   estvalue: number
   defaultimageurl: string
   imagecount: number
   auctionid: number
   sessionid: number
   lotnumber: number
   nextlotid: number
   previouslotid: number
   openingbid: number
   currentbid: number
   total: number
   sessionenddatetime: string
   sessionlivestartdatetime: string
   sessionstatusname: string
   buyerspremium: number
   ownerpaddleid: number
   winningpaddleid: number
   imageurllocation: string | null
   image360completeddate: string | null
   owcind: boolean
   provenance: string
   quantity: number
   vintage: string
   bottlesize: string
   bottlename: string
   region: string
   subregion: string
   country: string
   type: string
   reviewer: string
   review: string
   score: string
   cruclassification: string | null
   sortprice: number
   symbol: string | null
   producttypeid: number
   synonym: string
   location: string
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

export type FetchAuctionDetailsResponse = ApiResponseWithData<AuctionDetails>

export type FetchAuctionHighlightsDataReponse = ApiResponseWithData<AuctionHighlightsData>
export type FetchAuctionHighlightsDataRequest = {
   LotPageSize?: string
   PageIndex?: number
   Type?: string
   Country?: string
   Region?: string
   BottleName?: string
   Vintage?: string
   Score?: string
   Keyword?: string
   Collection?: string
   SortExpression?: string
   SortOrder?: string
   PriceFrom?: string
   PriceTo?: string
   SubRegion: string
   Producer: string
   Classification: string
   AuctionID: number
   SessionID: number
   Special: string
   Location: string
   CustomerID?: number | string
}
export interface AuctionDetails {
   auction: AuctionDetail
   sessions: Sessions[]
   bottleSizes: BottleSizes[]
   wineProducers: WineProducers[]
   wineCollections: WineCollections[]
   wineClassifications: WineClassifications[]
   wineVintages: WineVintages[]
}
export interface AuctionDetail {
   id: number
   createdDate: string
   createdByID: number
   typeID: number
   dateOfAuction: string
   previewDates: string
   previewVenueID: number
   venueID: number
   incrementSetID: number
   name: string
   description: string
   consignmentDeadline: string
   imageLocation: string
   facilityID: number
   showInvoicesInd: boolean
   activeInd: boolean
   enableAdjustments: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessions: any // Replace `any` with appropriate type if known
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   lots: any // Replace `any` with appropriate type if known
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   venue: any // Replace `any` with appropriate type if known
   currencyTypeID: number
}

export interface Sessions {
   id: number
   sessionID: number
   auctionID: number
   name: string
   description: string
   number: string
   startDateTime: string
   endDateTime: string
   liveStartDateTime: string
   liveEndDateTime: string | null
   sessionStatusID: number
   buyersPremium: number
   buyersPremiumDiscount: number
   showReservesOnline: boolean | null
}
export interface BottleSizes {
   bottleName: string
   bottleSize: string // if you want to preserve values like "0.25" as-is
   // bottleSize: number; // alternatively, if you're planning to treat them as numbers
}
export interface WineProducers {
   country: string
   region: string
   subRegion: string
   displayname: string
}

export interface WineCollections {
   provenance: string
}

export interface WineClassifications {
   cruClassification: string
   sortOrder: number | null
}
export interface WineVintages {
   vintage: string
}

export interface FetchAuctionAndSessionsByStatusIDsData {
   auctionID: number
   auctionTypeID: number
   auctionTypeName: string
   incrementSetID: number
   auctionName: string
   auctionDescription: string
   previewDates: string
   consignmentDeadline: string
   facilityID: number
   auctionActiveInd: boolean
   dateOfAuction: string
   sessionID: number
   sessionNumber: string
   startDateTime: string
   endDateTime: string
   liveStartDateTime: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   liveEndDateTime: any
   sessionName: string
   sessionDescription: string
   sessionStatusID: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessionTypeID: any
   sessionStatusName: string
   sessionActiveInd: boolean
   venueName: string
   venueURL: string
   phone1: string
   address1: string
   address2: string
   city: string
   state: string
   zip: string
   firstLot: string
   lastLot: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   description: any
   fullName: string
}
export type FetchFetchAuctionAndSessionsByStatusIDsReponse = ApiResponseWithData<
   FetchAuctionAndSessionsByStatusIDsData[]
>
export type FetchFetchAuctionAndSessionsByStatusIDsRequest = {
   statusId: string
}

export interface FilterLotsAuction {
   id: number
   createdDate: string
   createdByID: number
   typeID: number
   dateOfAuction: string
   previewDates: string
   previewVenueID: number
   venueID: number
   incrementSetID: number
   name: string
   description: string
   consignmentDeadline: string
   imageLocation: string
   facilityID: number
   showInvoicesInd: boolean
   activeInd: boolean
   enableAdjustments: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessions: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   lots: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   venue: any
   currencyTypeID: number
}

export interface Session {
   id: number
   sessionID: number
   auctionID: number
   name: string
   description: string
   number: string
   startDateTime: string
   endDateTime: string
   liveStartDateTime: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   liveEndDateTime: any
   sessionStatusID: number
   buyersPremium: number
   buyersPremiumDiscount: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   showReservesOnline: any
}

export interface WineProducer {
   country: string
   region: string
   subRegion: string
   displayname: string
}

export interface FilterBottleSize {
   bottleName: string
   bottleSize: string
}

export interface WineCollection {
   provenance: string
}

export interface WineClassification {
   cruClassification: string
   sortOrder?: number
}

export interface WineVintage {
   vintage: string
}

export interface FetchAuctionLotFiltersData {
   auction: FilterLotsAuction
   sessions: Session[]
   wineProducers: WineProducer[]
   bottleSizes: FilterBottleSize[]
   wineCollections: WineCollection[]
   wineClassifications: WineClassification[]
   wineVintages: WineVintage[]
}
export type FetchFetchAuctionLotFiltersReponse = ApiResponseWithData<FetchAuctionLotFiltersData>
export type FetchFetchAuctionLotFiltersRequest = {
   auctionId: number
}

export interface FetchAuctionBidSummaryByCustomerData {
   winning: number
   losing: number
   winningCount: number
   losingCount: number
   bidLimit: number
}
export type FetchAuctionBidSummaryByCustomerReponse = ApiResponseWithData<FetchAuctionBidSummaryByCustomerData>
export type FetchAuctionBidSummaryByCustomerRequest = {
   customerId: number
}

export interface AddBidData {
   id: number
   highBid: boolean
   currentBid: number
   message: string
   highBidderID: number
}
export type AddBidResponse = ApiResponseWithData<AddBidData>
export type AddBidRequest = {
   lotID: number
   PaddleID: number
   CustomerID: number
   AuctionID: number
   BidTypeID: number
   BidAmount: number
   EmployeID: number
   AdministratorInd: boolean
}

export interface UpcommingRequest {
   payload?: any
}

export interface UpcommingResponse {
   id?: number
   auctionID?: number
   dateOfAuction?: string // ISO date string
   name?: string
   consignmentDeadline?: string // ISO date string
   venueID?: number
   venueName?: string
   venueURL?: string
   phone1?: string
   address1?: string
   address2?: string
   city?: string
   state?: string
   zip?: string
   facilityAndName?: string
   startDateTime?: string // ISO date string with time
   endDateTime?: string // ISO date string with time
}

export interface LoadWineRegionsByAuctionIdData {
   country: string
   region: string
   subRegion: string
}
export type LoadWineRegionsByAuctionIdDataResponse = ApiResponseWithData<LoadWineRegionsByAuctionIdData[]>
export type LoadWineRegionsByAuctionIdDataRequest = {
   auctionID: number
}
