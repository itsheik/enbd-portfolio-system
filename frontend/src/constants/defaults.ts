import { type FetchAuctionHighlightsDataRequest } from '../interface/auction'
import { type FetchRetailWineListingDataRequest } from '../interface/retail'

export const DEFAULT_RETAIL_WINE_LISTING: FetchRetailWineListingDataRequest = {
   LotPageSize: '10',
   PageIndex: 1,
   Type: '',
   Country: '',
   Region: '',
   BottleName: '',
   Vintage: '',
   Score: '',
   Keyword: '',
   Collection: '',
   SortExpression: '',
   SortOrder: '',
   PriceFrom: '',
   PriceTo: '',
   sale: false,
} as const
export const DEFAULT_AUCTION_LOT_LISTING: FetchAuctionHighlightsDataRequest = {
   LotPageSize: '50',
   PageIndex: 1,
   Type: '',
   Country: '',
   Region: '',
   SubRegion: '',
   Producer: '',
   BottleName: '',
   Classification: '',
   Vintage: '',
   Score: '',
   Keyword: '',
   Collection: '',
   AuctionID: 763,
   SessionID: 1018,
   Special: '',
   Location: '',
   SortExpression: '',
   SortOrder: '',
   CustomerID: '',
} as const
