import * as Yup from 'yup'

// Validation schema for order form
export const orderValidationSchema = Yup.object({
   paymentMethod: Yup.string().required('Please select a payment method'),
   selectedCard: Yup.string().when('paymentMethod', {
      is: 'stored',
      then: schema => schema.required('Please select a stored payment method'),
      otherwise: schema => schema.nullable(),
   }),
   cardNumber: Yup.string().when('paymentMethod', {
      is: 'new',
      then: schema =>
         schema
            .required('Card number is required')
            .matches(/^\d{13,19}$/, 'Card number must be 13-19 digits')
            .matches(
               /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
               'Please enter a valid card number',
            ),
      otherwise: schema => schema.nullable(),
   }),
   expiryMonth: Yup.string().when('paymentMethod', {
      is: 'new',
      then: schema =>
         schema.required('Expiry month is required').matches(/^(0[1-9]|1[0-2])$/, 'Please enter a valid month (01-12)'),
      otherwise: schema => schema.nullable(),
   }),
   expiryYear: Yup.string().when('paymentMethod', {
      is: 'new',
      then: schema =>
         schema
            .required('Expiry year is required')
            .matches(/^(20[2-9][0-9]|2[1-9][0-9][0-9])$/, 'Please enter a valid year (2023+)'),
      otherwise: schema => schema.nullable(),
   }),
   securityCode: Yup.string().when('paymentMethod', {
      is: 'new',
      then: schema =>
         schema.required('Security code is required').matches(/^\d{3,4}$/, 'Security code must be 3-4 digits'),
      otherwise: schema => schema.nullable(),
   }),
})

// Validation schema for shipping options
export const shippingOptionsValidationSchema = Yup.object({
   deliveryDay: Yup.string().required('Please select a delivery day'),
   weatherRule: Yup.string().required('Please select a weather rule'),
   serviceType: Yup.string().required('Please select a service type'),
})
