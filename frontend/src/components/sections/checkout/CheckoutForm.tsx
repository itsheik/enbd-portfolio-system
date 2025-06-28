'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'
import { useCheckoutData } from '@/src/hooks/checkout/useCheckoutData'
import { checkoutValidationSchema } from '@/src/lib/utils/validations/dashboard'
import { setUserSlice } from '@/src/store/features/auth/authSlice'
import { selectGeneralSlice } from '@/src/store/features/general/generalSlice'
import { useLoadStatesMutation } from '@/src/store/services/general'

import AutocompleteDropdown from '../../form/AutoCompleteDropdown'

import { Heading, MButton, MTextInput, Paragraph } from '~/components/ui'

const CheckoutForm = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const { countries, states } = useSelector(selectGeneralSlice)

   const { isLoading, customerInfo } = useCheckoutData()

   const [newBillingStates, setNewBillingStates] = useState<
      {
         label: string
         value: string
         id: string
      }[]
   >([])
   const [newShippinggStates, setNewShippingStates] = useState<
      {
         label: string
         value: string
         id: string
      }[]
   >([])

   const [
      getBillingStates,
      {
         isLoading: getBillingStatesLoading,
         isSuccess: getBillingStatesSuccess,
         isError: getBillingStatesIsError,
         error: getBillingStatesError,
         data: getBillingStatesData,
      },
   ] = useLoadStatesMutation()

   const [
      getShippingStates,
      {
         isLoading: getShippingStatesLoading,
         isSuccess: getShippingStatesSuccess,
         isError: getShippingStatesIsError,
         error: getShippingStatesError,
         data: getShippingStatesData,
      },
   ] = useLoadStatesMutation()

   const formik = useFormik({
      initialValues: {
         firstName: customerInfo?.firstName || '',
         lastName: customerInfo?.lastName || '',
         email: customerInfo?.emailAddress || '',
         promoCode: '',
         shipping_phone: customerInfo?.officePhone.toString() || '',
         shipping_country: customerInfo?.shippingAddress.countryName || '',
         shipping_primaryAddress: customerInfo?.shippingAddress.address1 || '',
         shipping_secondaryAddress: customerInfo?.shippingAddress.address2 || '',
         shipping_city: customerInfo?.shippingAddress.city || '',
         shipping_state: customerInfo?.shippingAddress.state || '',
         shipping_zip: customerInfo?.shippingAddress.zip || '',
         billing_country: customerInfo?.billingAddress.countryName || '',
         billing_primaryAddress: customerInfo?.billingAddress.address1 || '',
         billing_secondaryAddress: customerInfo?.billingAddress.address2 || '',
         billing_city: customerInfo?.billingAddress.city || '',
         billing_state: customerInfo?.billingAddress.state || '',
         billing_zip: customerInfo?.billingAddress.zip || '',
         mobile: customerInfo?.mobilePhone || '',
         phone: customerInfo?.homePhone || '',
         source: customerInfo?.sourceID || '',
      },
      validationSchema: checkoutValidationSchema,
      enableReinitialize: true,
      onSubmit: async values => {
         // router.push(routes.shipping_options)

         dispatch(
            setUserSlice({
               customerBillingShippingInfo: {
                  ...values,
                  source: Number(values.source),
               },
            }),
         )
         formik.resetForm()

         router.push(routes.shipping_options)
      },
   })

   useEffect(() => {
      if (countries && formik.values.billing_country) {
         const findCountry = countries.find(item => item.name === formik.values.billing_country)

         if (findCountry) {
            getBillingStates({ countryId: findCountry.iD_PK })
         }
      }
   }, [formik.values.billing_country, countries])

   useEffect(() => {
      if (countries && formik.values.shipping_country) {
         const findCountry = countries.find(item => item.name === formik.values.shipping_country)

         if (findCountry) {
            getShippingStates({ countryId: findCountry.iD_PK })
         }
      }
   }, [formik.values.shipping_country, countries])

   useEffect(() => {
      if (getBillingStatesSuccess) {
         const States =
            getBillingStatesData.payload.data && getBillingStatesData.payload.data.length > 0
               ? getBillingStatesData.payload.data.map(state => ({
                    label: state.name,
                    value: state.name,
                    id: state.iD_PK.toString(),
                 }))
               : []
         setNewBillingStates(States)
      }
   }, [getBillingStatesSuccess])

   useEffect(() => {
      if (getShippingStatesSuccess) {
         const States =
            getShippingStatesData.payload.data && getShippingStatesData.payload.data.length > 0
               ? getShippingStatesData.payload.data.map(state => ({
                    label: state.name,
                    value: state.name,
                    id: state.iD_PK.toString(),
                 }))
               : []
         setNewShippingStates(States)
      }
   }, [getShippingStatesSuccess])

   const Countries = countries
      ? countries.map(country => ({
           label: country.name,
           value: country.name,
           id: country.iD_PK.toString(),
        }))
      : []

   const RenderBillingStates = () => {
      return getBillingStatesLoading ? (
         'Loading Billing States...'
      ) : formik.values.billing_country && newBillingStates && newBillingStates.length > 0 ? (
         <div className="w-full">
            <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
               State
            </Paragraph>
            <AutocompleteDropdown
               options={newBillingStates}
               queryKey="billing_state"
               styles={{
                  inputContainer: 'text-c-red-primary',
                  dropdownContainer: 'text-c-red-primary',
               }}
               name="billing_state"
               error={formik.touched.billing_state && Boolean(formik.errors.billing_state)}
               errorMessage={formik.errors.billing_state}
               onBlur={formik.handleBlur}
               onChange={value => formik.setFieldValue('billing_state', value)}
               hideSearchIcon
               id="billing_state"
               placeholder={formik.values.billing_state || 'Select State'}
            />
         </div>
      ) : formik.values.billing_country ? (
         <div className="w-full">
            <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
               State
            </Paragraph>
            <span className="text-red-primary font-medium text-base text-center">
               There are not states available for selected country!
            </span>
         </div>
      ) : (
         ''
      )
   }

   const RenderShippingStates = () => {
      return getShippingStatesLoading ? (
         'Loading Shipping States...'
      ) : formik.values.shipping_country && newShippinggStates && newShippinggStates.length > 0 ? (
         <div className="w-full">
            <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
               State
            </Paragraph>
            <AutocompleteDropdown
               options={newShippinggStates}
               queryKey="shipping_state"
               styles={{
                  inputContainer: 'text-c-red-primary',
                  dropdownContainer: 'text-c-red-primary',
               }}
               name="shipping_state"
               error={formik.touched.shipping_state && Boolean(formik.errors.shipping_state)}
               errorMessage={formik.errors.shipping_state}
               onBlur={formik.handleBlur}
               onChange={value => formik.setFieldValue('shipping_state', value)}
               hideSearchIcon
               id="shipping_state"
               placeholder={formik.values.shipping_state || 'Select State'}
            />
         </div>
      ) : formik.values.billing_country ? (
         <div className="w-full">
            <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
               State
            </Paragraph>
            <span className="text-red-primary font-medium text-base text-center">
               There are not states available for selected country!
            </span>
         </div>
      ) : (
         ''
      )
   }

   return (
      <section className="w-full">
         <form className="w-full grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
            <Heading
               order={3}
               className="w-full text-white bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
            >
               General Information
            </Heading>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     First Name
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="firstName"
                     value={formik.values.firstName}
                     onChange={formik.handleChange}
                     aria-label="firstName"
                     onBlur={formik.handleBlur}
                     error={formik.touched.firstName && formik.errors.firstName}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Last Name
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="lastName"
                     value={formik.values.lastName}
                     onChange={formik.handleChange}
                     aria-label="lastName"
                     onBlur={formik.handleBlur}
                     error={formik.touched.lastName && formik.errors.lastName}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Phone Number{' '}
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="phone"
                     value={formik.values.phone}
                     onChange={formik.handleChange}
                     aria-label="phone"
                     onBlur={formik.handleBlur}
                     error={formik.touched.phone && formik.errors.phone}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Email
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="email"
                     name="email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     aria-label="email"
                     onBlur={formik.handleBlur}
                     error={formik.touched.email && formik.errors.email}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Address 1
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="billing_primaryAddress"
                     value={formik.values.billing_primaryAddress}
                     onChange={formik.handleChange}
                     aria-label="billing_primaryAddress"
                     onBlur={formik.handleBlur}
                     error={formik.touched.billing_primaryAddress && formik.errors.billing_primaryAddress}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Address 2
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="billing_secondaryAddress"
                     value={formik.values.billing_secondaryAddress}
                     onChange={formik.handleChange}
                     aria-label="billing_secondaryAddress"
                     onBlur={formik.handleBlur}
                     error={formik.touched.billing_secondaryAddress && formik.errors.billing_secondaryAddress}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     City
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="billing_city"
                     value={formik.values.billing_city}
                     onChange={formik.handleChange}
                     aria-label="billing_city"
                     onBlur={formik.handleBlur}
                     error={formik.touched.billing_city && formik.errors.billing_city}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Postal Code
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="billing_zip"
                     value={formik.values.billing_zip}
                     onChange={formik.handleChange}
                     aria-label="billing_zip"
                     onBlur={formik.handleBlur}
                     error={formik.touched.billing_zip && formik.errors.billing_zip}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Country
                  </Paragraph>

                  <AutocompleteDropdown
                     options={Countries}
                     queryKey="billing_country"
                     styles={{
                        inputContainer: 'text-c-red-primary',
                        dropdownContainer: 'text-c-red-primary',
                     }}
                     name="billing_country"
                     error={formik.touched.billing_country && Boolean(formik.errors.billing_country)}
                     errorMessage={formik.errors.billing_country}
                     onBlur={formik.handleBlur}
                     onChange={value => formik.setFieldValue('billing_country', value)}
                     hideSearchIcon
                     id="billing_country"
                  />
               </div>

               {RenderBillingStates()}
            </div>

            <Heading
               order={3}
               className="w-full text-white bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
            >
               Shipping Information
            </Heading>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Phone Number{' '}
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="shipping_phone"
                     value={formik.values.shipping_phone}
                     onChange={formik.handleChange}
                     aria-label="shipping_phone"
                     onBlur={formik.handleBlur}
                     error={formik.touched.shipping_phone && formik.errors.shipping_phone}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     City
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="shipping_city"
                     value={formik.values.shipping_city}
                     onChange={formik.handleChange}
                     aria-label="shipping_city"
                     onBlur={formik.handleBlur}
                     error={formik.touched.shipping_city && formik.errors.shipping_city}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Address 1
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="shipping_primaryAddress"
                     value={formik.values.shipping_primaryAddress}
                     onChange={formik.handleChange}
                     aria-label="shipping_primaryAddress"
                     onBlur={formik.handleBlur}
                     error={formik.touched.shipping_primaryAddress && formik.errors.shipping_primaryAddress}
                  />
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Address 2
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="shipping_secondaryAddress"
                     value={formik.values.shipping_secondaryAddress}
                     onChange={formik.handleChange}
                     aria-label="shipping_secondaryAddress"
                     onBlur={formik.handleBlur}
                     error={formik.touched.shipping_secondaryAddress && formik.errors.shipping_secondaryAddress}
                  />
               </div>
            </div>
            <div className="w-full flex grow gap-4 flex-col sm:flex-row">
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Country
                  </Paragraph>

                  <AutocompleteDropdown
                     options={Countries}
                     queryKey="shipping_country"
                     styles={{
                        inputContainer: 'text-c-red-primary',
                        dropdownContainer: 'ext-c-red-primary',
                        container: 'max-w-full',
                     }}
                     name="shipping_country"
                     error={formik.touched.shipping_country && Boolean(formik.errors.shipping_country)}
                     errorMessage={String(formik.errors.shipping_country)}
                     onBlur={formik.handleBlur}
                     onChange={value => formik.setFieldValue('shipping_country', value)}
                     hideSearchIcon
                     id="shipping_country"
                  />
               </div>

               {RenderShippingStates()}
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                     Postal Code
                  </Paragraph>
                  <MTextInput
                     size="sm"
                     showicon={'false'}
                     type="text"
                     name="shipping_zip"
                     value={formik.values.shipping_zip}
                     onChange={formik.handleChange}
                     aria-label="shipping_zip"
                     onBlur={formik.handleBlur}
                     error={formik.touched.shipping_zip && formik.errors.shipping_zip}
                  />
               </div>
            </div>

            <MButton className="max-w-xs col-end-2" type="submit">
               Submit & Continue
            </MButton>
         </form>
      </section>
   )
}

export default CheckoutForm
