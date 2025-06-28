import * as yup from 'yup'

export const searchSettingsValidationSchema = yup.object({
   locations: yup.array().of(yup.string()),
})
export const paymentMethodValidationSchema = yup.object({
   paymentMethod: yup.string().required('Please select a paymennt method'),
})

export const checkoutValidationSchema = yup.object({
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required('Last Name is required'),

   // contactInf
   email: yup.string().email('Email is invalid').required('Email is required'),
   mobile: yup.string().optional(),
   phone: yup.string().optional(),

   // shippingInf
   shipping_primaryAddress: yup.string().required('Shipping Address is required'),
   shipping_secondaryAddress: yup.string().optional(),
   shipping_country: yup.string().required('Shipping Country is required'),
   shipping_city: yup.string().required('Shipping City is required'),
   shipping_state: yup.string().optional(),
   shipping_zip: yup.string().required('Shipping Zip is required'),
   shipping_phone: yup.string().optional(),
   // billingInf
   billing_primaryAddress: yup.string().required('Billing Address is required'),
   billing_secondaryAddress: yup.string().optional(),
   billing_country: yup.string().required('Billing Country is required'),
   billing_city: yup.string().optional(),
   billing_state: yup.string().optional(),
   billing_zip: yup.string().required('Billing Zip is required'),

   source: yup.number().optional(),
   promoCode: yup.string().optional(),
})
export const profileUpdateValidationSchema = yup.object({
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required('Last Name is required'),
   company: yup.string().required('Company Name is required'),
   username: yup.string().required('Username is required'),
   password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Confirm Password must match with New Password')
      .required('Confirm Password is required'),
   // contactInf
   officeNo: yup.string().optional(),
   homeNo: yup.string().optional(),
   mobile: yup.string().optional(),
   email: yup.string().email('Email is invalid').required('Email is required'),
   alternativeEmail: yup.string().optional(),

   //payment
   paymentMethod: yup.string().optional(),

   //shipping_info
   shipping_optionPrimary: yup.string().optional(),
   shipping_optionSecondary: yup.string().optional(),
})
