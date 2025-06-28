import * as yup from 'yup'

export const loginValidationSchema = yup.object({
   username: yup.string().required('Username is required'),
   password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

export const signupValidationSchema = yup.object({
   username: yup.string().required('Username is required'),
   password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Confirm Password must match with New Password')
      .required('Confirm Password is required'),
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required('Last Name is required'),
   company: yup.string().required('Company Name is required'),

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

   // billingInf
   billing_primaryAddress: yup.string().required('Billing Address is required'),
   billing_secondaryAddress: yup.string().optional(),
   billing_country: yup.string().required('Billing Country is required'),
   billing_city: yup.string().required('Billing City is required'),
   billing_state: yup.string().optional(),
   billing_zip: yup.string().required('Billing Zip is required'),

   source: yup.number().required('Source is required'),
   promoCode: yup.string().optional(),
})
