'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

import { loginValidationSchema } from '@/src/lib/utils/validations/auth'
import { setLogIn, setLogoutLoading } from '@/src/store/features/auth/authSlice'
import { useAuthLoginMutation } from '@/src/store/services/auth'
import { ApiErrorToast, ApiSuccessToast } from '@/src/utils/helpers'

import SimpleCheckbox from '../../form/CheckBox'
import { Heading, MButton, MTextInput, Paragraph } from '../../ui'

import AuthLayout from './Layout'

const LoginSection = () => {
   const router = useRouter()
   const dispatch = useDispatch()
   const [signIn, { isError, isSuccess, isLoading, error, data }] = useAuthLoginMutation()

   const formik = useFormik({
      initialValues: {
         username: 'jasontest9871',
         password: 'passwordss',
         rememberMe: false,
      },
      validationSchema: loginValidationSchema,
      onSubmit: values => {
         window.location.href = '/'

         // signIn({ username: values.username, password: values.password })
      },
   })

   useEffect(() => {
      if (isError && error) {
         ApiErrorToast(error)
      }
   }, [isError])

   useEffect(() => {
      let TIME_OUT = null

      if (isSuccess) {
         ApiSuccessToast(data.message.length ? data.message : 'Login successful')

         TIME_OUT = setTimeout(() => {
            dispatch(
               setLogIn({
                  token: data.payload.token,
                  username: data.payload.username,
                  userid: data.payload.userid,
               }),
            )

            dispatch(setLogoutLoading(true))
            window.location.href = '/'
         }, 1000)
      }

      return () => {
         if (TIME_OUT) clearTimeout(TIME_OUT)
      }
   }, [isSuccess])

   return (
      <AuthLayout title="WELCOME BACK">
         <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center max-[950px]:px-4">
               <div className="w-full max-w-sm flex flex-col items-center gap-6">
                  <div className="text-center ">
                     <Heading order={2} className="text-red-secondary font-normal ">
                        LOGIN
                     </Heading>
                     <Paragraph className="md:font-light font-gilda-display text-b-white-secondary md:text-base">
                        Welcome Back! Please login to your account
                     </Paragraph>
                  </div>
                  <div className="w-full">
                     <Paragraph className="md:font-light mb-2.5 font-gilda-display text-b-white-secondary md:text-base">
                        User Name
                     </Paragraph>
                     <MTextInput
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        aria-label="Username"
                        size="md"
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && formik.errors.username}
                     />
                  </div>
                  <div className="w-full">
                     <Paragraph className="md:font-light mb-2.5 font-gilda-display text-b-white-secondary md:text-base">
                        Password
                     </Paragraph>
                     <MTextInput
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                        aria-label="Password"
                        size="md"
                     />
                  </div>
                  <div className="w-full flex justify-between items-center">
                     {' '}
                     <SimpleCheckbox
                        label="Remember Me"
                        isChecked={formik.values.rememberMe}
                        onChange={() => formik.setFieldValue('rememberMe', !formik.values.rememberMe)}
                        styles={{
                           label: 'text-sm font-medium text-b-white-secondary',
                        }}
                     />
                     <button
                        type="button"
                        onClick={e => {
                           e.stopPropagation()
                           router.push('/auth/reset-password')
                        }}
                     >
                        <Paragraph className="cursor-pointer md:font-light font-gilda-display text-b-white-secondary md:text-sm">
                           Forgot Password?
                        </Paragraph>
                     </button>
                  </div>
                  <MButton className="max-w-xs min-w-xs max-[950px]:min-w-full" type="submit" loading={isLoading}>
                     Login
                  </MButton>

                  <Paragraph className="md:font-light font-gilda-display text-b-white-secondary md:text-sm">
                     New User?{' '}
                     <button
                        type="button"
                        onClick={() => router.push('/auth/register')}
                        className="text-red-secondary text-base cursor-pointer"
                     >
                        Signup
                     </button>
                  </Paragraph>
               </div>
            </div>
         </form>
      </AuthLayout>
   )
}

export default LoginSection
