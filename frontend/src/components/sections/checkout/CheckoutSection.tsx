import React from 'react'

import BackButton from '../../ui/BackButton'
import GlobalHeading from '../../ui/Headings/GlobalHeading'

import CheckoutAside from './CheckoutAside'
import CheckoutForm from './CheckoutForm'

const CheckoutSection = () => {
   return (
      <section>
         <div className="w-full flex justify-between items-center mb-4">
            <GlobalHeading title="Billing Information" />
            <BackButton />
         </div>
         <div className="grid grid-cols-1 gap-6 md:flex">
            <CheckoutForm />
            <CheckoutAside />
         </div>
      </section>
   )
}

export default CheckoutSection
