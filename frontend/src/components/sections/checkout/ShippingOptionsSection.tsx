'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'

import { SHIPPING_SPECIFIC_DAY_OPTIONS, SHIPPING_STANDARD_RULES_OPTIONS } from '@/src/constants/dummyData'
import { shippingOptionsValidationSchema } from '@/src/lib/utils/validations/order'

import AutocompleteDropdown from '../../form/AutoCompleteDropdown'
import { Paragraph } from '../../ui'
import BackButton from '../../ui/BackButton'
import ShippingTypesTable from '../dashboard/Tables/ShippingTypeTable'

const ShippingOptionsSection = () => {
   const [shippingDay, setShippingDay] = useState<string>('')
   const [serviceTypeError, setServiceTypeError] = useState(false)

   const formik = useFormik({
      initialValues: {
         deliveryDay: '',
         weatherRule: '',
         serviceType: '',
      },
      validationSchema: shippingOptionsValidationSchema,
      onSubmit: values => {
         console.log('Shipping options submitted:', values)
         // Handle form submission here
      },
   })

   const handleServiceTypeValidationChange = (hasError: boolean) => {
      setServiceTypeError(hasError)
   }

   const handleServiceTypeChange = (serviceType: string | null, price: number | null) => {
      formik.setFieldValue('serviceType', serviceType || '')
   }

   const handlePaymentSummaryClick = () => {
      // Trigger validation for all fields
      formik
         .validateForm()
         .then(errors => {
            if (Object.keys(errors).length > 0) {
               // Mark all fields as touched to show errors
               formik.setTouched({
                  deliveryDay: true,
                  weatherRule: true,
                  serviceType: true,
               })
            }

            return errors
         })
         .catch(error => {
            console.error('Validation error:', error)

            return error
         })
   }

   return (
      <section className="flex flex-col-reverse justify-between items-start md:flex-row gap-3">
         <div>
            <Paragraph className="md:text-sm ">
               Shipping quotes below will automatically include any non-shipped orders you have with us and the cost
               will be consolidated to give you the best price possible. Shipping will take place on the same day your
               order is place if the order is made prior to 2PM Pacific Time. When the weather is unsafe for shipping,
               your order will not be shipped automatically. If the temperatures at any point during the shipping route
               are above 80 degrees or below 30 degrees we will not automatically ship your wine. Your order will stored
               free of charge in our temperature and humidty controlled warehouse. If you would still like to ship
               regardless of weather, please indicate this below.
            </Paragraph>
            <div className="flex gap-2 items-center mt-1.5">
               <Paragraph className="md:text-sm text-c-red-primary">
                  Need your wine shipped on a specific day? Please choose one of the following:
               </Paragraph>
               <AutocompleteDropdown
                  options={SHIPPING_SPECIFIC_DAY_OPTIONS}
                  placeholder="Select Shipping Specific Day"
                  queryKey="deliveryDay"
                  styles={{
                     inputContainer: 'text-c-red-primary',
                     dropdownContainer: 'text-c-red-primary',
                  }}
                  name="deliveryDay"
                  hideSearchIcon
                  id="deliveryDay"
                  error={formik.touched.deliveryDay && Boolean(formik.errors.deliveryDay)}
                  errorMessage={formik.errors.deliveryDay}
                  onBlur={formik.handleBlur}
                  onChange={value => {
                     formik.setFieldValue('deliveryDay', value)
                     setShippingDay(value)
                  }}
                  required
               />
            </div>
            <div className="flex gap-2 items-center my-3">
               <Paragraph className="md:text-sm text-c-red-primary">
                  Please follow your Standards rules on weather:
               </Paragraph>
               <AutocompleteDropdown
                  options={SHIPPING_STANDARD_RULES_OPTIONS}
                  placeholder="Select Standard Rule"
                  queryKey="weatherRule"
                  styles={{
                     inputContainer: 'text-c-red-primary',
                     dropdownContainer: 'text-c-red-primary',
                  }}
                  name="weatherRule"
                  hideSearchIcon
                  id="weatherRule"
                  error={formik.touched.weatherRule && Boolean(formik.errors.weatherRule)}
                  errorMessage={formik.errors.weatherRule}
                  onBlur={formik.handleBlur}
                  onChange={value => formik.setFieldValue('weatherRule', value)}
                  required
               />
            </div>
            <div className="w-full">
               <ShippingTypesTable
                  shippingDay={shippingDay}
                  selectedServiceType={formik.values.serviceType}
                  onServiceTypeChange={handleServiceTypeChange}
                  error={serviceTypeError || (formik.touched.serviceType && Boolean(formik.errors.serviceType))}
                  errorMessage={formik.errors.serviceType || 'Please select a service type'}
                  onValidationChange={handleServiceTypeValidationChange}
                  onPaymentSummaryClick={handlePaymentSummaryClick}
               />
            </div>
         </div>
         <BackButton />
      </section>
   )
}

export default ShippingOptionsSection
