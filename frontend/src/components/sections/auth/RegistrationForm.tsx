'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Image from 'next/image'

import { type LoadCountriesData, type LoadStatesData } from '@/src/interface/general'
import { signupValidationSchema } from '@/src/lib/utils/validations/auth'
import { selectGeneralSlice, setGeneralSlice } from '@/src/store/features/general/generalSlice'
import { useAuthSignupMutation } from '@/src/store/services/auth'
import { useLoadStatesMutation } from '@/src/store/services/general'
import { ApiErrorToast } from '@/src/utils/helpers'
import { Cheers } from '@/src/utils/images/main-page'

import AutocompleteDropdown from '../../form/AutoCompleteDropdown'
import { Heading, MButton, MTextInput, Paragraph } from '../../ui'

const RegistrationForm = () => {
   const [signUp, { isError, isSuccess, isLoading, error, data }] = useAuthSignupMutation()
   const [
      getStates,
      {
         isLoading: getStatesLoading,
         isSuccess: getStatesSuccess,
         isError: getStatesIsError,
         error: getStatesError,
         data: getStatesData,
      },
   ] = useLoadStatesMutation()
   const dispatch = useDispatch()
   const { countries, states } = useSelector(selectGeneralSlice)

   const getValueLabel = (options: LoadCountriesData[]) => {
      return options.map(option => ({
         label: option.name,
         value: option.iD_PK.toString(),
      }))
   }

   const getStateValueLabel = (options: LoadStatesData[]) => {
      return options.map(option => ({
         label: option.name,
         value: option.iD_PK.toString(),
      }))
   }

   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         company: '',
         username: '',
         password: '',
         confirmPassword: '',
         email: '',
         source: '',
         promoCode: '',
         shipping_country: '',
         shipping_primaryAddress: '',
         shipping_secondaryAddress: '',
         shipping_city: '',
         shipping_state: '',
         shipping_zip: '',
         billing_country: '',
         billing_primaryAddress: '',
         billing_secondaryAddress: '',
         billing_city: '',
         billing_state: '',
         billing_zip: '',
         mobile: '',
         phone: '',
      },
      validationSchema: signupValidationSchema,
      onSubmit: values => {
         signUp({
            Customer: {
               FirstName: values.firstName,
               LastName: values.lastName,
               Company: values.company,
               EmailAddress: values.email,
               HomePhone: values.phone,
               MobilePhone: values.mobile,
               OfficePhone: '987-654-3210',
               Password: values.password,
               SourceID: Number(values.source),
               SourceNotes: 'Sign-up from website',
               UserName: values.username,
            },
            Address: {
               Address1: values.shipping_primaryAddress,
               Address2: values.shipping_secondaryAddress,
               City: values.shipping_city,
               CountryCodeID: Number(values.shipping_country),
               Zip: values.shipping_zip,
               State: values.shipping_state,
            },
            CaptchaResponse: 'xyz123abc',
         })
      },
   })

   useEffect(() => {
      // Clear states when country changes
      if (formik.values.shipping_country) {
         getStates({
            countryId: Number(formik.values.shipping_country),
         })
      }
   }, [formik.values.shipping_country])

   useEffect(() => {
      if (getStatesSuccess && getStatesData?.payload?.data) {
         dispatch(
            setGeneralSlice({
               states: getStatesData.payload.data,
            }),
         )
      } else if (getStatesIsError) {
         ApiErrorToast(getStatesError)
      }
   }, [getStatesSuccess, getStatesIsError])

   return (
      <section className="relative">
         <Heading order={2} className="text-red-secondary font-normal mb-10 text-center">
            CREATE AN ACCOUNT
         </Heading>
         <div className="w-full border-[2px] border-b-white-primary shadow-white-secondary p-6 md:p-10">
            <Paragraph className="md:font-light text-center mb-7 font-gilda-display text-b-white-secondary md:text-base">
               Forgot your username or password? Already have an account with us? Click here to have your password
               emailed to you.{' '}
            </Paragraph>
            <form className="grid md:grid-cols-2" onSubmit={formik.handleSubmit}>
               <div className="sm:border-r sm:border-r-table-head-muted sm:pr-4 grid gap-3">
                  <Heading
                     order={3}
                     className="w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     Account Information
                  </Heading>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           First Name
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="firstName"
                           placeholder="Enter your first name"
                           value={formik.values.firstName}
                           onChange={formik.handleChange}
                           aria-label="firstName"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.firstName && formik.errors.firstName}
                        />
                     </div>
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Last Name
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="lastName"
                           placeholder="Enter your last name"
                           value={formik.values.lastName}
                           onChange={formik.handleChange}
                           aria-label="lastName"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.lastName && formik.errors.lastName}
                        />
                     </div>
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Company
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="company"
                        placeholder="Enter your company name"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        aria-label="company"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.company && formik.errors.company}
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Username
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        aria-label="username"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && formik.errors.username}
                     />
                  </div>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Password
                        </Paragraph>
                        <MTextInput
                           type="password"
                           name="password"
                           placeholder="******"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           aria-label="password"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.password && formik.errors.password}
                        />
                     </div>
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Re-enter Password{' '}
                        </Paragraph>
                        <MTextInput
                           type="password"
                           name="confirmPassword"
                           placeholder="******"
                           value={formik.values.confirmPassword}
                           onChange={formik.handleChange}
                           aria-label="confirmPassword"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                     </div>
                  </div>
                  <Heading
                     order={3}
                     className="w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     Contact Information
                  </Heading>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Phone Number{' '}
                        </Paragraph>
                        <MTextInput
                           type="number"
                           name="phone"
                           placeholder="Enter your phone"
                           value={formik.values.phone}
                           onChange={formik.handleChange}
                           aria-label="phone"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.phone && formik.errors.phone}
                        />
                     </div>
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Mobile Number
                        </Paragraph>
                        <MTextInput
                           type="number"
                           name="mobile"
                           placeholder="Enter your mobile"
                           value={formik.values.mobile}
                           onChange={formik.handleChange}
                           aria-label="mobile"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.mobile && formik.errors.mobile}
                        />
                     </div>
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Email
                     </Paragraph>
                     <MTextInput
                        type="email"
                        name="email"
                        placeholder="Enter your last name"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        aria-label="email"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                     />
                  </div>
                  <Heading
                     order={3}
                     className="w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     How did you hear about us?
                  </Heading>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Source
                        </Paragraph>
                        <MTextInput
                           type="number"
                           name="source"
                           placeholder="Enter source"
                           value={formik.values.source}
                           onChange={formik.handleChange}
                           aria-label="source"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.source && formik.errors.source}
                        />
                     </div>
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Other/Promo Code:{' '}
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="promoCode"
                           placeholder="Enter promo code"
                           value={formik.values.promoCode}
                           onChange={formik.handleChange}
                           aria-label="promoCode"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.promoCode && formik.errors.promoCode}
                        />
                     </div>
                  </div>
               </div>
               <div className="sm:pl-4 grid gap-3.5">
                  <Heading
                     order={3}
                     className="w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     shipping information
                  </Heading>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Country
                     </Paragraph>

                     <AutocompleteDropdown
                        options={countries ? getValueLabel(countries) : []}
                        placeholder="country"
                        queryKey="shipping_country"
                        styles={{
                           inputContainer: 'bg-beige text-c-red-primary',
                           dropdownContainer: 'bg-beige text-c-red-primary',
                        }}
                        name="shipping_country"
                        error={formik.touched.shipping_country && Boolean(formik.errors.shipping_country)}
                        errorMessage={formik.errors.shipping_country}
                        onBlur={formik.handleBlur}
                        onChange={value => formik.setFieldValue('shipping_country', value)}
                        hideSearchIcon
                        id="shipping_country"
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Address 1:
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="shipping_primaryAddress"
                        placeholder="Enter shipping primary address"
                        value={formik.values.shipping_primaryAddress}
                        onChange={formik.handleChange}
                        aria-label="shipping_primaryAddress"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.shipping_primaryAddress && formik.errors.shipping_primaryAddress}
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Address 2:
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="shipping_secondaryAddress"
                        placeholder="Enter shipping secondary address"
                        value={formik.values.shipping_secondaryAddress}
                        onChange={formik.handleChange}
                        aria-label="shipping_secondaryAddress"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.shipping_secondaryAddress && formik.errors.shipping_secondaryAddress}
                     />
                  </div>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           City
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="shipping_city"
                           placeholder="Enter shipping city"
                           value={formik.values.shipping_city}
                           onChange={formik.handleChange}
                           aria-label="shipping_city"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.shipping_city && formik.errors.shipping_city}
                        />
                     </div>
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           State
                        </Paragraph>

                        <AutocompleteDropdown
                           options={states ? getStateValueLabel(states) : []}
                           placeholder="Enter shipping state"
                           queryKey="shipping_state"
                           styles={{
                              inputContainer: 'bg-beige text-c-red-primary',
                              dropdownContainer: 'bg-beige text-c-red-primary',
                           }}
                           name="shipping_state"
                           error={formik.touched.shipping_state && Boolean(formik.errors.shipping_state)}
                           errorMessage={formik.errors.shipping_state}
                           onBlur={formik.handleBlur}
                           onChange={value => formik.setFieldValue('shipping_state', value)}
                           hideSearchIcon
                           id="shipping_state"
                        />
                     </div>
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Postal Code
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="shipping_zip"
                           placeholder="Enter shipping zip"
                           value={formik.values.shipping_zip}
                           onChange={formik.handleChange}
                           aria-label="shipping_zip"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.shipping_zip && formik.errors.shipping_zip}
                        />
                     </div>
                  </div>

                  <Heading
                     order={3}
                     className="w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     billing information
                  </Heading>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Country
                     </Paragraph>

                     <AutocompleteDropdown
                        options={countries ? getValueLabel(countries) : []}
                        placeholder="country"
                        queryKey="billing_country"
                        styles={{
                           inputContainer: 'bg-beige text-c-red-primary',
                           dropdownContainer: 'bg-beige text-c-red-primary',
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
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Address 1:
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="billing_primaryAddress"
                        placeholder="Enter billing primary address"
                        value={formik.values.billing_primaryAddress}
                        onChange={formik.handleChange}
                        aria-label="billing_primaryAddress"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.billing_primaryAddress && formik.errors.billing_primaryAddress}
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Address 2:
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="billing_secondaryAddress"
                        placeholder="Enter billing secondary address"
                        value={formik.values.billing_secondaryAddress}
                        onChange={formik.handleChange}
                        aria-label="billing_secondaryAddress"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.billing_secondaryAddress && formik.errors.billing_secondaryAddress}
                     />
                  </div>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           City
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="billing_city"
                           placeholder="Enter billing city"
                           value={formik.values.billing_city}
                           onChange={formik.handleChange}
                           aria-label="billing_city"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.billing_city && formik.errors.billing_city}
                        />
                     </div>
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           State
                        </Paragraph>

                        <AutocompleteDropdown
                           options={countries ? getValueLabel(countries) : []}
                           placeholder="Enter billing state"
                           queryKey="billing_state"
                           styles={{
                              inputContainer: 'bg-beige text-c-red-primary',
                              dropdownContainer: 'bg-beige text-c-red-primary',
                           }}
                           name="billing_state"
                           error={formik.touched.billing_state && Boolean(formik.errors.billing_state)}
                           errorMessage={formik.errors.billing_state}
                           onBlur={formik.handleBlur}
                           onChange={value => formik.setFieldValue('billing_state', value)}
                           hideSearchIcon
                           id="billing_state"
                        />
                     </div>
                     <div>
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Postal Code
                        </Paragraph>
                        <MTextInput
                           type="text"
                           name="billing_zip"
                           placeholder="Enter billing zip"
                           value={formik.values.billing_zip}
                           onChange={formik.handleChange}
                           aria-label="billing_zip"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.billing_zip && formik.errors.billing_zip}
                        />
                     </div>
                  </div>
                  <MButton type="submit" className="sm:w-max sm:px-9" loading={isLoading}>
                     Create an account
                  </MButton>
               </div>
            </form>
         </div>
         <div aria-label="wine bottles" className="flex items-center justify-center relative bottom-10 left-0 right-0">
            <Image width={577} height={577} src={Cheers} alt="Bottle Shake" placeholder="blur" />
         </div>
      </section>
   )
}

export default RegistrationForm
