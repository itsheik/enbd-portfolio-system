import React from 'react'
import { Heading, Paragraph } from '../../ui'
import { TERMS_AND_CONDITIONS } from '@/src/constants/constants'

const TermsAndConditionsComponent = () => {
   return (
      <section>
         {' '}
         <Heading order={2} className="text-red-secondary font-normal text-3xl">
            Spectrum Wine Auctions The May 2025 Auction: Part 4{' '}
         </Heading>
         <Paragraph className="font-medium md:font-medium text-base mt-1 text-b-white-secondary">
            YOU MUST AGREE TO THE TERMS AND CONDITIONS BEFORE BIDDING IN THIS AUCTION
         </Paragraph>
         <ul className="pl-5 my-5">
            {TERMS_AND_CONDITIONS.map(feat => {
               return (
                  <li key={feat} className="leading-0 m-0 p-0 list-disc ">
                     <Paragraph className="my-0 font-light md:font-light text-sm ">{feat} </Paragraph>
                  </li>
               )
            })}
         </ul>
      </section>
   )
}

export default TermsAndConditionsComponent
