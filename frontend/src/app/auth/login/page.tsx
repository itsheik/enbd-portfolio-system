import { SectionContainer } from '@/src/components/sections'
import LoginSection from '@/src/components/sections/auth/LoginSection'

function SignInPage() {
   return (
      <SectionContainer className="flex justify-center items-center py-16">
         <LoginSection />
      </SectionContainer>
   )
}

export default SignInPage
