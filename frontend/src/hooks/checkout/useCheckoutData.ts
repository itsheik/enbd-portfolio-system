import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectUserSlice, setUserSlice } from '@/src/store/features/auth/authSlice'
import { selectRetailSlice, setRetailSlice } from '@/src/store/features/retail/retailSlice'
import {
   useCustomerInfoMutation,
   useGetPaymentMethodsByCustomerMutation,
   useGetShippingRatesMutation,
} from '@/src/store/services/retail'
import { ApiErrorToast } from '@/src/utils/helpers'
import { getCartId } from '@/src/utils/storage/protectedStorage'

import { updateQueryParams } from '../useUpdateQueryParams'

export const useCheckoutData = () => {
   const [customerInfoMutation, { isLoading, isSuccess, isError, error, data }] = useCustomerInfoMutation()

   const [
      getPaymentMethodsByCustomer,
      {
         isLoading: paymentMethodsLoading,
         isSuccess: paymentMethodsSuccess,
         isError: paymentMethodsIsError,
         error: paymentMethodsError,
         data: paymentMethodsData,
      },
   ] = useGetPaymentMethodsByCustomerMutation()

   const [
      getShippingRates,
      {
         isLoading: getShippingRatesLoading,
         isSuccess: getShippingRatesSuccess,
         isError: getShippingRatesIsError,
         error: getShippingRatesError,
         data: getShippingRatesData,
      },
   ] = useGetShippingRatesMutation()

   const { paymentMethods, shippingRates } = useSelector(selectRetailSlice)

   const dispatch = useDispatch()

   const { customerInfo, customerBillingShippingInfo } = useSelector(selectUserSlice)

   const cartId = getCartId()

   useEffect(() => {
      customerInfoMutation()

      if (!paymentMethods) {
         getPaymentMethodsByCustomer()
      }
      if (!shippingRates && cartId && customerBillingShippingInfo) {
         getShippingRates({
            cartId,
            shippingCountry: customerBillingShippingInfo.shipping_country,
            shippingState: customerBillingShippingInfo.shipping_state,
         })
      }
   }, [paymentMethods, shippingRates])

   useEffect(() => {
      if (isSuccess) {
         dispatch(
            setUserSlice({
               customerInfo: data.payload.data,
            }),
         )

         const { billingAddress, shippingAddress } = data.payload.data

         if (billingAddress) {
            if (billingAddress.countryName) {
               // debouncedUpdateSearchQuery('billing_country', billingAddress.country)
               updateQueryParams('billing_country', billingAddress.countryName)
            }
            if (billingAddress.state) {
               // debouncedUpdateSearchQuery('billing_state', billingAddress.state)
               updateQueryParams('billing_state', billingAddress.state)
            }
         }

         if (shippingAddress) {
            if (shippingAddress.countryName) {
               // debouncedUpdateSearchQuery('shipping_country', shippingAddress.country)
               updateQueryParams('shipping_country', shippingAddress.countryName)
            }
            if (shippingAddress.state) {
               // debouncedUpdateSearchQuery('shipping_state', shippingAddress.state)
               updateQueryParams('shipping_state', shippingAddress.state)
            }
         }
      }
   }, [isSuccess])

   useEffect(() => {
      if (getShippingRatesSuccess && getShippingRatesData?.payload.data) {
         dispatch(
            setRetailSlice({
               shippingRates: getShippingRatesData.payload.data,
            }),
         )
      }
   }, [getShippingRatesSuccess])

   useEffect(() => {
      if (paymentMethodsSuccess && paymentMethodsData.payload.data) {
         dispatch(
            setRetailSlice({
               paymentMethods: paymentMethodsData.payload.data,
            }),
         )
      }
   }, [paymentMethodsSuccess])

   useEffect(() => {
      if (paymentMethodsIsError) {
         ApiErrorToast(paymentMethodsError)
      }
   }, [paymentMethodsIsError])

   useEffect(() => {
      if (getShippingRatesIsError) {
         ApiErrorToast(getShippingRatesError)
      }
   }, [getShippingRatesIsError])

   useEffect(() => {
      if (isError) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      if (isError) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      if (isError) {
         ApiErrorToast(error)
      }
   }, [isError])

   return {
      isLoading,
      customerInfo,
      paymentMethodsLoading,
      getShippingRatesLoading,
      paymentMethods,
      shippingRates,
      customerBillingShippingInfo,
   }
}
