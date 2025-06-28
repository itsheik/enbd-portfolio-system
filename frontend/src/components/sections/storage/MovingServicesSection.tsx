import { Storage } from '@/src/utils/images/main-page'
import Image from 'next/image'
import React from 'react'
import { Heading, Paragraph } from '../../ui'

const MovingServicesSection = () => {
   return (
      <div className="md:flex md:items-center md:justify-between">
         <div className="w-full md:max-w-[648px]">
            <Heading order={2} className="text-red-secondary font-normal text-3xl">
               Full Service Professional Fine Wine And Spirits Moving Services
            </Heading>
            <Paragraph className="font-light md:font-light text-base my-4">
               Our team is experienced in handling the finest wine and spirits on the planet. We have inventoried,
               packed and transported well over $100 million worth of wine. So who better to help you move your
               collection or handle your inventory or packing project?
            </Paragraph>
            <Paragraph className="font-light md:font-light text-base">
               Our team is experienced in handling the finest wine and spirits on the planet. We have inventoried,
               packed and transported well over $100 million worth of wine. So who better to help you move your
               collection or handle your inventory or packing project?
            </Paragraph>
         </div>
         <div className="w-full lg:min-w-[490px] lg:max-w-[500px] max-h-[450px]">
            {' '}
            <Image src={Storage} alt="wine footer" placeholder="blur" className="md:object-contain" />
         </div>
      </div>
   )
}

export default MovingServicesSection
