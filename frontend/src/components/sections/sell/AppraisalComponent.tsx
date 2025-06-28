import React from 'react'
import Image from 'next/image'

import { NewportStorage, WineArt } from '@/src/utils/images/main-page'

import { Paragraph } from '../../ui'

const AppraisalComponent = () => {
   return (
      <section>
         {' '}
         <ul className="pl-5 my-5">
            <li className="leading-0 m-0 p-0 list-disc ">
               <Paragraph className="my-0 font-light md:font-light text-base ">
                  Essentially, there are two types of appraised values: the item's value in the market: its fair market
                  value, often referred to as the price paid by a willing Buyer to a willing seller; and its replacement
                  value, the retail price that would have to be paid to replace the item. Even if you don't plan to
                  sell, ENBD Portfolio Auctions offers both fair market and insurance appraisals for private individuals,
                  corporations, museums, banks, estate lawyers, etc. Our appraisals are all private and confidential,
                  and detailed written descriptions, inventories and values of the items appraised will be provided.
               </Paragraph>
            </li>
            <li className="leading-0 m-0 p-0 list-disc ">
               {' '}
               <Paragraph className="my-0 font-light md:font-light text-base ">
                  You can use our online appraisal schedule request form below, call ENBD Portfolio Auctions at (949)
                  748-4845 or email us at<span className="underline cursor-pointer"> info@spectrumwine.com</span> to
                  schedule a private appraisal.{' '}
               </Paragraph>
            </li>
            <li className="leading-0 m-0 p-0 list-disc ">
               {' '}
               <Paragraph className="my-0 font-light md:font-light text-base ">
                  Please login first to schedule your appraisal.
                  <span className="underline cursor-pointer"> Click here to login to your account.</span>
               </Paragraph>
            </li>
         </ul>
      </section>
   )
}

export default AppraisalComponent
