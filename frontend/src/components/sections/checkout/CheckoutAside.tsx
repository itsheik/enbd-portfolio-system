import React from 'react'
import Image from 'next/image'

import { sellAuction, wineBottle } from '@/src/utils/images/main-page'

import { Heading, Paragraph } from '../../ui'

import { MTextInput } from '~/components/ui'

const CheckoutAside = () => {
   return (
      <aside className="w-full md:max-w-[476px] flex flex-col gap-2 items-center">
         <div className="w-full bg-beige px-5 py-3.5 rounded-lg">
            <div className="w-full flex items-center gap-2.5 relative ">
               <div className="flex items-center gap-6 h-[108px] w-32 relative ">
                  <Image
                     fill
                     src={wineBottle}
                     alt="Bottle Shake"
                     placeholder={'blur'}
                     className="object-contain mix-blend-multiply brightness-125 md:px-6"
                  />
               </div>
               <div className="w-[1px] h-[87px] bg-[#8282826B]"></div>
               <div className="w-full">
                  <Heading className="font-gilda-display font-normal text-red-secondary">title</Heading>
                  <Paragraph className="font-light text-sm">
                     location <br /> description
                  </Paragraph>

                  <Paragraph className="text-sm font-semibold text-black">Only 12 Remaining In Stock</Paragraph>
               </div>
            </div>
            <MTextInput
               type="text"
               name="firstName"
               placeholder="Promo code"
               aria-label="firstName"
               size="md"
               className="my-4"
               showicon={'false'}
            />
            <div className="flex justify-between">
               <Paragraph className="text-sm">Total Payment</Paragraph>
               <Paragraph className="font-semibold text-c-red-primary">$2200</Paragraph>
            </div>
         </div>
         <Image
            src={sellAuction}
            alt="wine footer"
            placeholder="blur"
            className="w-full max-h-[360px] object-contain md:max-w-[409px]"
         />
      </aside>
   )
}

export default CheckoutAside
