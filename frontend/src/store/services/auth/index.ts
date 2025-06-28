import {
   type LoginDataReponse,
   type LoginDataRequest,
   type SignupDataReponse,
   type SignupDataRequest,
} from '@/src/interface/auth'

import { apiSlice } from './../apiSlice'

import { API_ENDPOINTS } from '~/constants'

export const AuthApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: builder => ({
      authLogin: builder.mutation<LoginDataReponse, LoginDataRequest>({
         query: payload => ({
            url: API_ENDPOINTS.AUTH.LOGIN,
            method: 'POST',
            body: payload,
            invalidateTags: ['AuthLogin'],
         }),
      }),
      authSignup: builder.mutation<SignupDataReponse, SignupDataRequest>({
         query: payload => ({
            url: API_ENDPOINTS.AUTH.REGISTER,
            method: 'POST',
            body: payload,
            invalidateTags: ['AuthSignup'],
         }),
      }),
   }),
})

export const { useAuthLoginMutation, useAuthSignupMutation } = AuthApi
