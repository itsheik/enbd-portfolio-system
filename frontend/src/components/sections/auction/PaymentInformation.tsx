import React from 'react'
import { Heading } from '~/components/ui'
import { LogoCard } from '~/components/cards/LogoCard'
import { AmericanExpress, Discover, MasterCard } from '@/src/utils/images/main-page'

const PaymentInformation = () => {
   return (
      <div className="w-full">
         <Heading order={2} className="text-xl font-normal text-primary">
            We accept Visa, MasterCard, Discover and American Express, check, money order and bank wires.
         </Heading>
         <div className="flex justify-center items-center gap-5 mt-10">
            {[MasterCard, Discover, AmericanExpress].map((item, i) => {
               return <LogoCard image={item} key={i} />
            })}
         </div>
      </div>
   )
}

export default PaymentInformation
