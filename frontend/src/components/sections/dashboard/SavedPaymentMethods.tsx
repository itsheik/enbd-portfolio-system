'use client'
import React from 'react'
import { useFormik } from 'formik'

import { paymentMethodValidationSchema } from '@/src/lib/utils/validations/dashboard'

import AutocompleteDropdown from '../../form/AutoCompleteDropdown'
import GlobalHeading from '../../ui/Headings/GlobalHeading'

import PaymentMethodTable from './Tables/PaymentMethodTable'

import { Heading, MButton, Paragraph } from '~/components/ui'

const SavedPaymentMethods = () => {
   const formik = useFormik({
      initialValues: {
         paymentMethod: '',
      },
      validationSchema: paymentMethodValidationSchema,
      onSubmit: values => {
         console.log(values)
      },
   })
   const options = [
      { label: 'Orange County', value: 'orange' },
      { label: 'Los Angeles', value: 'la' },
      { label: 'San Diego', value: 'sd' },
   ]
   //    useEffect(() => {
   //       alert(formik.values.paymentMethod)
   //    }, [formik.values.paymentMethod])

   return (
      <section>
         <GlobalHeading title="Saved Payment Methods" />
         <Heading
            order={3}
            className="w-full bg-red-secondary text-white text-base font-semibold font-inter uppercase px-3 py-1.5 rounded-sm mt-2"
         >
            Saved Payment method{' '}
         </Heading>
         <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between items-center">
               <div>
                  <Paragraph className="md:font-light mb-1 mt-2 font-gilda-display text-c-red-primary md:text-base">
                     Your Current Default Payment Method
                  </Paragraph>
                  <AutocompleteDropdown
                     options={options}
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

            <MButton className="w-max mt-2" onClick={() => console.log('hello')}>
               Save Changes
            </MButton>
         </form>
      </section>
   )
}

export default SavedPaymentMethods
