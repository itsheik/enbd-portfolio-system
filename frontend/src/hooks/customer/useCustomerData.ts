import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setUserSlice } from '@/src/store/features/auth/authSlice'
import { useAddCustomerAddressMutation, useUpdateCustomerAddressMutation } from '@/src/store/services/retail'
import { ApiErrorToast } from '@/src/utils/helpers'

type TUseCustomerData = {
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
   source: string
   resetForm: () => void
}
export const useCustomerData = (values: TUseCustomerData) => {
   const dispatch = useDispatch()
   const [
      addCustomerAddress,
      {
         isLoading: addCustomerAddressLoading,
         isSuccess: addCustomerAddressSuccess,
         isError: addCustomerAddressIsError,
         error: addCustomerAddressError,
         data: addCustomerAddressData,
      },
   ] = useAddCustomerAddressMutation()

   const [
      updateCustomerAddress,
      {
         isLoading: updateCustomerAddressLoading,
         isSuccess: updateCustomerAddressSuccess,
         isError: updateCustomerAddressIsError,
         error: updateCustomerAddressError,
         data: updateCustomerAddressData,
      },
   ] = useUpdateCustomerAddressMutation()

   useEffect(() => {
      if (addCustomerAddressSuccess) {
         dispatch(
            setUserSlice({
               customerBillingShippingInfo: {
                  ...values,
                  source: Number(values.source),
               },
            }),
         )
        //  values.resetForm()
      }
   }, [addCustomerAddressSuccess])

   useEffect(() => {
      if (updateCustomerAddressSuccess) {
         dispatch(
            setUserSlice({
               customerBillingShippingInfo: {
                  ...values,
                  source: Number(values.source),
               },
            }),
         )
        //  values.resetForm()
      }
   }, [updateCustomerAddressSuccess])

   useEffect(() => {
      if (addCustomerAddressIsError) {
         ApiErrorToast(addCustomerAddressError)
      }
   }, [addCustomerAddressIsError])

   useEffect(() => {
      if (updateCustomerAddressIsError) {
         ApiErrorToast(updateCustomerAddressError)
      }
   }, [updateCustomerAddressIsError])

   return {
      addCustomerAddress,
      updateCustomerAddress,
      addCustomerAddressLoading,
      addCustomerAddressData,
      updateCustomerAddressLoading,
      updateCustomerAddressData,
   }
}
