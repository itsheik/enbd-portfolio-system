'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import { type LoadCountriesData, type LoadStatesData } from '@/src/interface/general'
import { profileUpdateValidationSchema } from '@/src/lib/utils/validations/dashboard'
import { selectUserSlice } from '@/src/store/features/auth/authSlice'
import { selectGeneralSlice } from '@/src/store/features/general/generalSlice'

import AutocompleteDropdown from '../../form/AutoCompleteDropdown'
import SimpleCheckbox from '../../form/CheckBox'
import GlobalHeading from '../../ui/Headings/GlobalHeading'
import { InformationSVG } from '../../ui/icons/svg-icons'

import PaymentMethodTable from './Tables/PaymentMethodTable'

import { Heading, MButton, MTextInput, Paragraph } from '~/components/ui'

const PersonalProfile = () => {
   const user = useSelector(selectUserSlice)

   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         company: '',
         username: '',
         password: '',
         confirmPassword: '',
         email: '',
         shipping_optionPrimary: '',
         shipping_optionSecondary: '',
         mobile: '',
         officeNo: '',
         homeNo: '',
         alternativeEmail: '',
         paymentMethod: '',
      },
      validationSchema: profileUpdateValidationSchema,
      onSubmit: values => {
         console.log(values)
      },
   })

   return (
      <div>
         <GlobalHeading title="General Account Information" />
         <Paragraph className="text-b-white-secondary">Customer ID# {user?.userId}</Paragraph>

         <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2">
               <div className="sm:border-r sm:border-r-table-head-muted sm:pr-4 grid gap-3">
                  <Heading
                     order={3}
                     className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     Account Information
                  </Heading>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           First Name
                        </Paragraph>
                        <MTextInput
                           showicon={'false'}
                           type="text"
                           name="firstName"
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
                           showicon={'false'}
                           type="text"
                           name="lastName"
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
                        showicon={'false'}
                        type="text"
                        name="company"
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
                        showicon={'false'}
                        type="text"
                        name="username"
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
                           showicon={'false'}
                           type="password"
                           name="password"
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
                           showicon={'false'}
                           type="password"
                           name="confirmPassword"
                           value={formik.values.confirmPassword}
                           onChange={formik.handleChange}
                           aria-label="confirmPassword"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                     </div>
                  </div>
               </div>
               <div className="sm:pl-4 grid gap-3.5">
                  <Heading
                     order={3}
                     className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
                  >
                     Contact Information
                  </Heading>
                  <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Office Number
                        </Paragraph>
                        <MTextInput
                           showicon={'false'}
                           type="text"
                           name="officeNo"
                           value={formik.values.officeNo}
                           onChange={formik.handleChange}
                           aria-label="officeNo"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.officeNo && formik.errors.officeNo}
                        />
                     </div>
                     <div className="w-full">
                        <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                           Home Number
                        </Paragraph>
                        <MTextInput
                           showicon={'false'}
                           type="text"
                           name="homeNo"
                           value={formik.values.homeNo}
                           onChange={formik.handleChange}
                           aria-label="homeNo"
                           size="md"
                           onBlur={formik.handleBlur}
                           error={formik.touched.homeNo && formik.errors.homeNo}
                        />
                     </div>
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Mobile
                     </Paragraph>
                     <MTextInput
                        showicon={'false'}
                        type="text"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        aria-label="mobile"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.mobile && formik.errors.mobile}
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Email
                     </Paragraph>
                     <MTextInput
                        showicon={'false'}
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        aria-label="email"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                     />
                  </div>
                  <div>
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Alternative Email
                     </Paragraph>
                     <MTextInput
                        showicon={'false'}
                        type="email"
                        name="alternativeEmail"
                        value={formik.values.alternativeEmail}
                        onChange={formik.handleChange}
                        aria-label="alternativeEmail"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.alternativeEmail && formik.errors.alternativeEmail}
                     />
                  </div>
               </div>
            </div>
            <div className=" grid gap-2">
               <Heading
                  order={3}
                  className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
               >
                  Shipping Preference
               </Heading>
               <div className="w-full flex grow gap-4 flex-col sm:flex-row">
                  <div className="w-full">
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-c-red-primary md:text-base">
                        Ship My Wine Via
                     </Paragraph>

                     <AutocompleteDropdown
                        placeholder="Ground"
                        options={[{ label: 'ali', value: 'data' }]}
                        queryKey="shipping_optionPrimary"
                        styles={{
                           inputContainer: 'text-c-red-primary',
                           dropdownContainer: 'ext-c-red-primary',
                           container: 'max-w-full',
                        }}
                        name="shipping_optionPrimary"
                        error={formik.touched.shipping_optionPrimary && Boolean(formik.errors.shipping_optionPrimary)}
                        errorMessage={formik.errors.shipping_optionPrimary}
                        onBlur={formik.handleBlur}
                        onChange={value => formik.setFieldValue('shipping_optionPrimary', value)}
                        hideSearchIcon
                        id="shipping_optionPrimary"
                     />
                  </div>
                  <div className="w-full">
                     <Paragraph className="md:font-light mb-2 font-gilda-display text-transparent md:text-base">
                        Country
                     </Paragraph>

                     <AutocompleteDropdown
                        placeholder="Ground"
                        options={[{ label: 'ali', value: 'data' }]}
                        queryKey="shipping_optionSecondary"
                        styles={{
                           inputContainer: 'text-c-red-primary',
                           dropdownContainer: 'ext-c-red-primary',
                           container: 'max-w-full',
                        }}
                        name="shipping_optionSecondary"
                        error={
                           formik.touched.shipping_optionSecondary && Boolean(formik.errors.shipping_optionSecondary)
                        }
                        errorMessage={formik.errors.shipping_optionSecondary}
                        onBlur={formik.handleBlur}
                        onChange={value => formik.setFieldValue('shipping_optionSecondary', value)}
                        hideSearchIcon
                        id="shipping_optionSecondary"
                     />
                  </div>
               </div>
            </div>
            <div className=" grid gap-2">
               <Heading
                  order={3}
                  className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
               >
                  Saved Payment Method
               </Heading>
               <div className="flex justify-between items-center">
                  <div>
                     <Paragraph className="md:font-light mb-1 mt-2 font-gilda-display text-c-red-primary md:text-base">
                        Your Current Default Payment Method
                     </Paragraph>
                     <AutocompleteDropdown
                        options={[
                           { label: 'Orange County', value: 'orange' },
                           { label: 'Los Angeles', value: 'la' },
                           { label: 'San Diego', value: 'sd' },
                        ]}
                        placeholder="country"
                        queryKey="paymentMethod"
                        styles={{
                           inputContainer: 'text-c-red-primary',
                           dropdownContainer: 'text-c-red-primary',
                        }}
                        name="paymentMethod"
                        error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                        errorMessage={formik.errors.paymentMethod}
                        onBlur={formik.handleBlur}
                        onChange={value => formik.setFieldValue('paymentMethod', value)}
                        hideSearchIcon
                        id="paymentMethod"
                     />
                  </div>
                  <ul>
                     <li className="list-disc text-sm text-b-white-secondary">
                        Your Default Payment Option will be automatically Charged After the close of the auction
                     </li>
                     <li className="list-disc text-sm text-b-white-secondary">
                        You can change your payment option anytime before each auction closes
                     </li>
                  </ul>
               </div>
               <PaymentMethodTable />
            </div>
            <div className=" grid gap-2">
               <Heading
                  order={3}
                  className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
               >
                  Addresses
               </Heading>
               <li className="list-disc ml-4 text-b-white-secondary text-sm">
                  Please note for security reasons changing your address will not update any order that are currently in
                  process
               </li>
            </div>
            <div className=" grid gap-2">
               <Heading
                  order={3}
                  className="text-white w-full bg-red-secondary text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm"
               >
                  Notification Setting
               </Heading>
               <Paragraph className="text-c-red-primary font-gilda-display">Notification Option</Paragraph>
               <div>
                  {['Bid Notifictaion', 'OutBid Notification'].map((item, i) => {
                     return (
                        <React.Fragment key={i}>
                           <div key={i} className="flex justify-between items-center w-full   my-1">
                              <Paragraph className="text-b-white-secondary md:text-sm">{item}</Paragraph>
                              <div className="flex items-center gap-3">
                                 <InformationSVG className="text-b-red-secondary" />
                                 <SimpleCheckbox />
                              </div>
                           </div>
                           <div className="w-full h-[1px] bg-b-white-primary"></div>
                        </React.Fragment>
                     )
                  })}
               </div>
            </div>
            <MButton type="submit" className="sm:w-max sm:px-4 sm:py-0 place-self-end">
               Update Setting
            </MButton>
         </form>
      </div>
   )
}

export default PersonalProfile
