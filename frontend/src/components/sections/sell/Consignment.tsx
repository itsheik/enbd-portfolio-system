import React from 'react'
import Image from 'next/image'

import { NewportStorage, WineArt } from '@/src/utils/images/main-page'

import { Paragraph } from '../../ui'

const Consignment = () => {
   return (
      <section>
         {' '}
         <ul className="pl-5 my-5">
            <li className="leading-0 m-0 p-0 list-disc ">
               <Paragraph className="my-0 font-light md:font-light text-base ">
                  To get started on the exciting and rewarding path of consigning with Spectrum Wine Auctions, simply
                  fill in the following Consignment Form with your consignment information. Upon completion of your
                  form, it will be e-mailed to the professionals at Spectrum Wine Auctions, at which time we will be
                  able to start working for you! Should you have any questions about completing this form, the items
                  that you have, and/or the Spectrum Wine Auctions process, do not hesitate to contact us at (949)
                  748-4845 or via email info@spectrumwine.com.{' '}
               </Paragraph>
            </li>
            <li className="leading-0 m-0 p-0 list-disc ">
               {' '}
               <Paragraph className="my-0 font-light md:font-light text-base ">
                  Please log in first to start your submission. Click here to log in to your account.
               </Paragraph>
            </li>
         </ul>
         <div className="flex justify-center items-center w-full">
            <Image
               width={450}
               height={380}
               src={WineArt}
               alt="Santa Ana storage"
               className="object-cover w-full md:w-[500px] object-center"
            />
         </div>
      </section>
   )
}

export default Consignment
