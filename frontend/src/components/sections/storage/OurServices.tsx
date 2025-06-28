import React from 'react'

import { OUR_SERVICES } from '@/src/constants/constants'

import ServicesCard from '../../cards/ServicesCard'
import { Heading } from '../../ui'

const OurServices = () => {
   return (
      <section className="w-full flex flex-col items-center">
         <Heading order={3} className="text-red-secondary font-normal text-3xl">
            Example of Our Services
         </Heading>
         <div className="flex flex-wrap items-center justify-center max-w-5xl gap-1 gap-y-3 mt-8">
            {OUR_SERVICES.map((service, index) => {
               return <ServicesCard key={index} title={service.title} imageSrc={service.imageSrc} />
            })}
         </div>
      </section>
   )
}

export default OurServices
