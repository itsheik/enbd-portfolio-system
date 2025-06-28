'use client'
import React from 'react'
import { Heading, MButton, MTextInput, Paragraph } from '../../ui'
import { AuthBanner } from './AuthBanner'
import SimpleCheckbox from '../../form/CheckBox'
import AuthLayout from './Layout'
import BackButton from '../../ui/BackButton'

const ResetPasswordSection = () => {
   return (
      <AuthLayout
         title="NO
WORRIES!"
      >
         <div className="flex items-center justify-center max-[950px]:px-4">
            <div className="w-full max-w-sm flex flex-col items-center gap-6">
               <div className="text-center ">
                  <Heading order={2} className="text-red-secondary font-normal uppercase">
                     Password Reset
                  </Heading>
                  <Paragraph className="md:font-light font-gilda-display text-b-white-secondary md:text-base">
                     Provide Email Associated with your account to recover your password.
                  </Paragraph>
               </div>
               <div className="w-full">
                  <Paragraph className="md:font-light mb-2.5 font-gilda-display text-b-white-secondary md:text-base">
                     Email
                  </Paragraph>
                  <MTextInput
                     type="email"
                     //   placeholder="Email Address"
                     //    value={email}
                     //    onChange={e => setEmail(e.target.value)}
                     aria-label="Email Address"
                     size="md"
                  />
               </div>

               <MButton className="max-w-xs min-w-xs max-[950px]:min-w-full" onClick={() => {}}>
                  Reset Password
               </MButton>
               <div className="flex justify-between w-full">
                  <div></div>
                  <BackButton />
               </div>
            </div>
         </div>
      </AuthLayout>
   )
}

export default ResetPasswordSection
