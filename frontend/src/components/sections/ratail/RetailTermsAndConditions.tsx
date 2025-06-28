'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { RETAIL_TERMS_AND_CONDITIONS } from '@/src/constants/constants'
import { Back } from '@/src/utils/images/main-page'

import { Heading, Paragraph } from '../../ui'

const RetailTermsAndConditions = () => {
   const router = useRouter()
   
return (
      <section className="flex flex-col gap-6">
         <button className="flex gap-3 items-center cursor-pointer" onClick={() => router.back()}>
            <Image src={Back} alt="Bottle Shake" className="mb-0.5" />
            <Heading className="font-normal">Back</Heading>
         </button>
         <Heading order={2} className="text-red-secondary font-normal text-4xl ">
            SPECTRUM WINE RETAIL AND DIRECT SALES TERMS OF SALE
         </Heading>
         <div>
            <Paragraph className="md:text-base font-light">Your Current Default Payment Method:</Paragraph>
            <Paragraph className="md:text-base font-medium">SPECTRUM WINE | RETAIL | TERMS OF SALE</Paragraph>
         </div>
         <div>
            <Paragraph className="font-light md:text-sm">
               Customers are strongly encouraged to read the Terms of Sale which describe theterms governing the
               purchase of all goods and services sold through our retail and direct sale division.
            </Paragraph>
            <ol>
               {RETAIL_TERMS_AND_CONDITIONS?.map((term, id) => (
                  <li className="list-decimal font-light text-sm ml-4" key={id}>
                     <Paragraph className="font-light md:text-sm ">{term}</Paragraph>
                  </li>
               ))}
            </ol>
         </div>
      </section>
   )
}

export default RetailTermsAndConditions
