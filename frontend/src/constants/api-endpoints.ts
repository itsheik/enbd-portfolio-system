export const API_ENDPOINTS = {
   //API_BASE_URL: https://clientweb-api-dev-hee0awa2f9e0cjep.westus-01.azurewebsites.net/api/
   //API DOUCMENT: https://docs.google.com/document/u/0/d/19PkTCzd4Ru7k_vEcd-r0gYM-McOc_AVkRsv3MTfVDW4/mobilebasic
   AUTH: {
      LOGIN: 'auth/login',
      REGISTER: 'auth/SignUp',
      FORGET_PASSWORD: 'auth/ForgotPassword',
   },
   RETAIL: {
      //HOMEPAGE RETAIL HIGHLIGHTS
      //RETAIL LISTING PAGE
      //POSTMAN: RETAIL FOLDER, APINAME: Load Retail Wine Listing
      //NOTE: ADJUST LOT PAGE SIZE AND KEEP ALL OTHER BODY PARAMS EMPTY STRING ""
      RETAIL_WINE_LISTING: 'Retail/RetailWineListing',
   },
   AUCTION: {
      //HOMEPAGE: Auction Highlights, Auction Lot Listing PAGE MAIN LISITNG
      //POSTMAN: //POSTMAN:AUCTION->Home->ViewMore->Load Auction Lot Listing
      //PAYLOAD: {"LotPageSize":"4","PageIndex":1,"Type":"","Country":"","Region":"","SubRegion":"","Producer":"","BottleName":"","Classification":"","Vintage":"","Score":"","Keyword":"","Collection":"","AuctionID":,"SessionID":,"Special":"","Location":"","SortExpression":"","SortOrder":"","CustomerID":}
      AUCTION_LOT_LISTING: 'Auction/AuctionLotListing',
      //API IS USED FOR FETCHING THE AUCTIONID OF CURRENT ACTIVE AUCTION
      //Auction Lot Listing PAGE
      //POSTMAN: AUCTION->HOME->Load Auction and Sessions By StatusID
      //IMPORTANT PARAMS:?statusId=97,9 FOR FETCHING THE CURRENT ACTIVE AUCTION
      AUCTION_AND_SESSIONS_BY_STATUS_ID: 'Auction/AuctionAndSessionsByStatusID',
      //AUCTION LOT LISTING PAGE DETAILS OF THE CURRENT AUCTION ON TOP OF THE PAGE AND DATA FOR THE LEFT SIDE FILTERS
      //POSTMAN:AUCTION->Home->ViewMore->Load Auction Lot
      //IMPORTNANT PARAM:?auctionId=763 YOU WILL GET THIS ID FROM PREVIOUS API
      AUCTION_LOT: 'Auction/AuctionLot',
      //AFTER THE ABOVE API SAME API WILL BE USED "AuctionLotListing" FOR THE LISTING OF AUCTIONED PRODUCTS WITH THE AUCTIONID AND OTHER FILTERS:
      //PAYLOAD FROM THE PREVIOUS INTEGRATION: {"LotPageSize":"10","PageIndex":0,"Type":"","Country":"","Region":"","SubRegion":"","Producer":"","BottleName":"","Classification":"","Vintage":"","Score":"","Keyword":"","Collection":"","AuctionID":858,"SessionID":1113,"Special":"","Location":"","SortExpression":"","SortOrder":"","CustomerID":267209}

      //PAGE:  Auction Lot Listing PAGE MAIN LISITNG
      //POSTMAN: Auction->Get Auction Bid Summary By Customer
      //PARAMS: customerId->[CustomerID get from Login API]
      //NOTE: Call this API only if customer is logged in
      AUCTION_BID_SUMMARY_BY_CUSTOMER: 'Auction/AuctionBidSummaryByCustomer',
      //PAGE: Auction Lot Listing PAGE MAIN LISITNG (Used for adding the customer bid)
      //POSTMAN: Bidding->addBid
      //lotIds=LOTID of the lot on which customer is adding the bid
      //{"lotid":3016321,"PaddleID":0,"CustomerID":267209,"AuctionID":858,"BidTypeID":2,"BidAmount":10,"EmployeID":0,"AdministratorInd":false}
      ADD_BID: 'Bidding/addBid',

      //PAGE: UPCOMING AUCTIONS
      //POSTMAN: AUCTION->Upcoming Auction Schedule->Load Upcoming Auctions By Facility
      //PARAMS: NO PARAMS
      UPCOMMING_AUCTION_BY_FACILITY: 'Auction/UpcomingAuctionsByFacility',

      //PAGE: Prices Realized
      //POSTMAN: AUCTION->Prices Realized->Load Auction and Sessions By StatusID Copy
      //PARAMS: FOR PARAMS PLEASE RFER TO THE POSTMAN
      AuctionAndSessionsByStatusID: 'Auction/AuctionAndSessionsByStatusID',

      LOAD_WINE_REGIONS_BY_AUCTION_ID: 'Auction/LoadWineRegionsByAuctionID',
   },
   GENERAL: {
      //Auction Lot Listing PAGE: FILTERS ON LEFT SIDE
      //POSTMAN:AUTH->COUNTRIES
      COUNTRIES: 'General/Countries',
      STATES: 'General/StateByCountryID',
   },
   //product detail page API's
   LOT: {
      //PAGE:  Auction Lot Listing PAGE MAIN LISITNG
      //POSTMAN:LOT->Lot Status For Live Bidding
      //PARAMS: PASS lotIds=[get lotids from the auctionlotlisting API]
      //Variables map: pending
      LOT_STATUS_FOR_LIVE_BIDDING: 'Lot/LotStatusForLiveBidding',
      // First API: Auction/AuctionBidSummaryByCustomer this api is listed above can be used for fetching the customer bid summary

      //Page: single Product details page
      //POSTMAN: LOT->Load Lot Details By LotID
      //Params: lotId=[PASS LOTID IN THE QUERY PARAM FROM PREVIOUS PAGE AND THEN SEND IT TO API]
      LOT_DETAILS_BY_LOT_ID: 'Lot/LotByLotID',

      //Page: single Product details page
      //POSTMAN: AUCTION->Load Images By LotID
      //PARAMS: lotId=[PASS LOTID IN THE QUERY PARAM FROM PREVIOUS PAGE AND THEN SEND IT TO API]
      IMAGES_BY_LOT_ID: 'Auction/ImagesByLotID',

      //LotStatusForLiveBidding this api which is listed above will be also integrated in the product detail page for fetching the bidding data

      //addBid API which is listed above but BidAmount parameter rather then receiving from the user in the input field nextbid value will be passed: API WILL BE FOR THE BUTTON "SUBMIT BID"

      //addbid: this api will also be used for the bidding where user will input the bidamount same like the user is bidding on the auction listing page

      //PAGE: PRODUCT DETAIL PAGE API WILL BE USED FOR THE ADDING PRODUCT INTO WATCHLIST
      //POSTMAN: AUCTION->Auction Schedule / Details->Add Lot To Watchlist
      //PARAMS: lotId
      ADD_TO_WATCH_LIST: 'Auction/AddLotToWatchlist',
   },
   CART: {
      //PAGE: RETAIL LISTING PAGE
      //POSTMAN: RETAIL->RetailWineListing
      //FOR RETAIL WINE LISTING PAGE FILTERS YOU WILL GET THE FILTER DATA FOR THE LEFT SIDE FROM THE SAME API
      //PARAMS: REFER TO THE POSTMAN
      RETAIL_WINE_LISTING: 'Retail/RetailWineListing',

      //PAGE: REATIL WINE LISTING
      //POSTMAN: RETAIL->AddItemToCart
      //PARAMS: REFER TO THE POSTMAN
      //FOR ADDING THE PRODUCT INTO THE CARD ON REATIL WINE LISTING PAGE
      ADD_ITEM_TO_CART: 'Retail/AddItemToCart',

      //PAGE: REATIL WINE LISTING
      //POSTMAN: RETAIL->RemoveItemFromCart
      //PARAMS: REFER TO THE POSTMAN
      //IMPORTNANT PARAMS: cartId: GENERATE UUID AND STORE IT ON THE LOCAL STORAGE
      //FOR REMOVING THE PRODUCT FROM THE CART
      REMOVE_ITEM_FROM_CART: 'Retail/RemoveItemFromCart',

      //PAGE: CHECKOUT PAGE | ORDER DETAILS PAGE
      //POSTMAN: RETAIL->AddItemToOrder
      //PARAMS: cartId:UNIQUE UID FOR THE CART FOR A SINGLE USER LOGIN SESSION, wineCatalogId:[YOU WILL GET THIS ID FROM API:RetailWineListing]
      //FOR REMOVING THE PRODUCT FROM THE ORDER
      ADD_ITEM_TO_ORDER: 'Retail/AddItemToOrder',
      REMOVE_ITEM_FROM_ORDER: 'Retail/RemoveItemFromOrder',

      //PAGE: CART PAGE
      //POSTMAN: RETAIL->LoadCart
      //PARAMS: cartId:UUID [PASS GENERATED UUID FOR THE CART TO FETCH THE CART]
      //FOR REMOVING THE PRODUCT FROM THE ORDER
      LOAD_CART: 'Retail/LoadCart',

      //PAGE: Checkout Information || BILLING AND SHIPPING INFORMATION
      //POSTMAN: Customer - My Account->CustomerDetails
      //PARAMS: REFER TO THE POSTMAN
      //API IS USED FOR FETCHING THE CUSTOMER DETAILS FOR SHIPPING AND BILLING INFORMATION OF THE CUSTOMER
      CUSTOMER_DETAILS: 'Customer/CustomerDetails',
      ADD_CUSTOMER_ADDRESS: 'Customer/AddCustomerAddress',
      UPDATE_CUSTOMER_ADDRESS: 'Customer/UpdateCustomerAddress',
      DELETE_CUSTOMER_ADDRESS: 'Customer/DeleteCustomerAddress',

      //Countries API IS ALSO WILL BE INETGRATED ON THE CHECKOUT INFORMATION PAGE FOR FETCHING THE COUNTRIES

      //PAGE: Checkout / Shipping Preferences
      //POSTMAN: Customer - My Account->Checkout->Profile->Get ShippingRates
      //PARAMS: cartID=219df6dc4b8&shippingCountry=United%20States%20of%20America&shippingState=ESTADO
      //API IS USED FOR FETCHING THE SHIPPING RATES INFORMATION
      GET_SHIPPING_RATES: 'ShippingRates/GetShippingRates',

      GET_PAYMENT_SUMMARY: 'ShippingRates/GetPaymentSummary',

      //PAGE: Checkout / Payment Information
      //POSTMAN: Customer - My Account->Checkout->PaymentMethodsByCustomer
      //API IS USED FOR FETCHING THE PAYMENT METHODS OF CUSTOMER
      PAYMENT_METHODS_BY_CUSTOMER: 'Customer/PaymentMethodsByCustomer',

      //PAGE: Checkout Information || BILLING AND SHIPPING INFORMATION
      //POSTMAN: General->StateByCountryID
      //PARAMS:countryId
      STATE_BY_COUNTRY_ID: 'General/StateByCountryID',

      //PAGE: CHECKOUT PAGE FOR PAYMENT PROCESSING---->DIRECT PAYMENT NOT STORED PAYMENT
      //POSTMAN: RETAIL->SubmitPayment
      //PARAMS: REFER TO THE POSTMAN
      SUBMIT_PAYMENT: 'Retail/SubmitPayment',

      //PAGE: CHECKOUT PAGE FOR PAYMENT PROCESSING---->API FOR PROCESSING THE ALREADY STORED PAYMENT
      //POSTMAN: RETAIL->SubmitPayment
      //PARAMS: REFER TO THE POSTMAN
      SUBMIT_PAYMENT_STORED: 'Retail/SubmitPaymentStored',

      //PAGE: CHECKOUT PAGE COMPLETING THE ORDER---->MAINLY THIS API IS USED FOR THE PAYMENT AND ORDER COMBINED AND ON MOSTLY PLACES THIS API WILL BE USED
      //POSTMAN: RETAIL->CompleteOrder
      //PARAMS: REFER TO THE POSTMAN
      COMPLETE_ORDER: 'Retail/CompleteOrder',
   },
} as const

export type ApiRouteKeys =
   (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS][keyof (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS]]
