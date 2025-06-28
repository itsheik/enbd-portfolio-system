import { SectionContainer } from '@/src/components/sections'
import RegistrationForm from '@/src/components/sections/auth/RegistrationForm'

function RegisterPage() {
   return (
      <SectionContainer className="flex justify-center items-center py-16">
         <RegistrationForm />
      </SectionContainer>
   )
}

export default RegisterPage
