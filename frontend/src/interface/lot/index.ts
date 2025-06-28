import { type ApiResponseWithData } from './../index'

export interface FetchLotDetailsByLotIdData {
   inventoryID: number
   consignmentID: number
   productTypeID: number
   internetHeading: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   internetHeading2: any
   catalogHeading: string
   subTitle: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   subTitle2: any
   subTitleLine2: string
   mainDescription: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   mainDescription2: any
   subDescription: string
   subDescriptionLine2: string
   condition: string
   estLowValue: number
   estHighValue: number
   estValue: number
   facilityID: number
   inventoryActiveInd: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   productTypeID1: any
   imageCount: number
   reference: number
   noReserve: boolean
   lotID: number
   createdByID: number
   sessionID: number
   lotNumber: number
   nextLotID: number
   previousLotID: number
   openingBid: number
   currentBid: number
   total: number
   total2: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   proofCurrentBid: any
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   proofPaddleNumber: any
   reserve: number
   withdrawnInd: boolean
   lotActiveInd: boolean
   auctionID: number
   incrementSetID: number
   venueID: number
   auctionTypeID: number
   dateOfAuction: string
   auctionName: string
   auctionDescription: string
   imageLocation: string
   auctionActiveInd: boolean
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessionID1: any
   sessionNumber: string
   sessionStatusID: number
   sessionStartDateTime: string
   sessionEndDateTime: string
   sessionLiveStartDateTime: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessionLiveEndDateTime: any
   buyersPremium: number
   buyersPremiumDiscount: number
   cashDiscount: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   showReservesOnline: any
   sessionStatusName: string
   ownerPaddleID: number
   ownerPaddleNumber: number
   winningPaddleID: number
   winningPaddleNumber: number
   winningCustomerID: number
   sellerID: number
   sellerLastName: string
   sellerFirstName: string
   salespersonID: number
   salespersonLastName: string
   salespersonFirstName: string
   buyerID: number
   buyerLastName: string
   buyerFirstName: string
   facilityShortName: string
   facilityFullName: string
   facilityAddressID: number
   facilityPhone: string
   facilityFax: string
   facilityEmail: string
   facilityURL: string
   imageURLLocation: string
   imageFileLocation: string
   orderID: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   image360CompletedDate: any
   symbol: string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   sessionTypeID: any
   location: string
}
export type FetchLotDetailsByLotIdResponse = ApiResponseWithData<FetchLotDetailsByLotIdData>
export type FetchLotDetailsByLotIdRequest = {
   lotId: string
}

export interface FetchImagesByLotIdData {
   imageID: number
   createdDate: string
   imageName: string
   imageThumbFileName: string
   imageNormalFileName: string
   imageOriginalFileName: string
   imageTypeID: number
   generic: boolean
   imageNotes: string
   activeInd: boolean
}
export type FetchImagesByLotIdResponse = ApiResponseWithData<FetchImagesByLotIdData[]>
export type FetchImagesByLotIdRequest = {
   lotId: string
}

export interface FetchLotStatusForLiveBiddingData {
   li: number
   ob: number
   cb: number
   ssi: number
   sedt: string
   bp: number
   wpi: number
   bi: number
   yb: number
   w: boolean
   tl: string
}
export type FetchLotStatusForLiveBiddingResponse = ApiResponseWithData<FetchLotStatusForLiveBiddingData[]>
export type FetchLotStatusForLiveBiddingRequest = {
   lotIds: string
}
