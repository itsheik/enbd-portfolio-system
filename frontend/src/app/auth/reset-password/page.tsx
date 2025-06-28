import { SectionContainer } from '@/src/components/sections'
import ResetPasswordSection from '@/src/components/sections/auth/ResetPasswordSection'

function SignInPage() {
   return (
      <SectionContainer className="flex justify-center items-center py-16">
         <ResetPasswordSection />
      </SectionContainer>
   )
}

export default SignInPage
