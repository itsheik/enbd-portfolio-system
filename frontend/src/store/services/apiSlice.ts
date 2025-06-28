import { type BaseQueryFn, createApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { env } from '~/constants'
import { type RootState } from '~/lib/store'
import { setLogIn, setLogout } from '~/store/features/auth/authSlice'

export interface SerializedError {
   name?: string
   message?: string
   stack?: string
   code?: string
   data?: {
      message?: string
      statusCode?: string
   }
}

const baseQuery = fetchBaseQuery({
   baseUrl: env.NEXT_PUBLIC_API_URL,
   prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).user.token
      // if (token) {
      //    headers.set('authorization', `Bearer ${token}`)
      // }

      // headers.set('authorization', `Bearer ${token}`)

      return headers
   },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, SerializedError> = async (
   args,
   api,
   extraOptions,
) => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const result: any = await baseQuery(args, api, extraOptions)

   if (result.error && result.error?.status === 401) {
      api.dispatch(setLogout())

      // const refreshToken = (api.getState() as RootState).user.token

      // CODE FOR HANDLING REFRESH TOKEN API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // const refreshResult: any = await baseQuery(
      //    {
      //       url: '/auth/client/refresh',
      //       method: 'POST',
      //       headers: {
      //          'Content-Type': 'application/json',
      //          authorization: `Bearer ${refreshToken}`,
      //       },
      //    },
      //    api,
      //    extraOptions,
      // )
      // if (refreshResult?.error?.status === 401) {
      //    api.dispatch(setLogout('/signin'))
      // } else {
      //    // api.dispatch(
      //    //    setLogIn({
      //    //       token: {
      //    //          accessToken: refreshResult?.data?.data?.token?.accessToken,
      //    //          refreshToken: refreshResult?.data?.data?.token?.refreshToken,
      //    //       },
      //    //       user: (api.getState() as RootState).user.user,
      //    //    }),
      //    // )
      //    // // retry the original query with new access token
      //    result = await baseQuery(args, api, extraOptions)
      // }
   }

   return result
}

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({}),
   tagTypes: [
      // Retail Section
      'RetailWineListing',
      'addRetailItemToCart',
      'paymentSummary',

      //auction section
      'AuctionLotListing',
      'loadWineRegionsByAuctionsId',

      // Auth Section
      'AuthLogin',
      'AuthSignup',

      // Customer Info
      'customerInfo',
      'customerPaymentMethods',
      'shippingRates',
   ],
})
