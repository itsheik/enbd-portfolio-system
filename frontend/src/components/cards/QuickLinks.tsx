'use client'
import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { sellAuction } from '@/src/utils/images/main-page'

import { EmailListing } from './EmailListing'

import { Heading } from '~/components/ui'
import { UPCOMMING_AUCTIONS_QUICK_LINKS } from '~/constants/constants'

type QuikcLinksProps = {
   quickLinks?: boolean
   emailListing?: boolean
   image?: boolean
   widthFull?: boolean
}
export const QuickLinksComponent: FC<QuikcLinksProps> = ({ quickLinks, emailListing, image, widthFull }) => {
   return (
      <aside className={`${widthFull ? 'w-full' : 'max-w-[259px] '}`}>
         {quickLinks === true && (
            <div className="bg-beige px-4 py-6 rounded-2xl mb-3">
               <Heading order={2} className="text-xl font-normal">
                  Quick Links
               </Heading>
               <ul className="list-disc ml-5">
                  {UPCOMMING_AUCTIONS_QUICK_LINKS.map(i => {
                     return (
                        <li key={i.title}>
                           <Link href={i.link} className="underline text-lg font-gilda-display">
                              {i.title}
                           </Link>
                        </li>
                     )
                  })}
               </ul>
            </div>
         )}
         {emailListing && <EmailListing />}
         {image && (
            <Image
               src={sellAuction}
               alt="wine footer"
               placeholder="blur"
               className="w-full min-h-[360px] object-cover"
            />
         )}
      </aside>
   )
}
