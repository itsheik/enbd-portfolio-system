'use client'

import type React from 'react'
import { useState } from 'react'
import Image from 'next/image'

import { SectionContainer } from '../section-container'

import auctionImage from '~/assets/images/sell-auction.jpg'
import retailImage from '~/assets/images/sell-retail.jpg'
import { Heading, MButton, MTextInput, Paragraph } from '~/components/ui'

export const NewsLetter = () => {
   const [email, setEmail] = useState('')

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle email submission logic here
      console.log('Email submitted:', email)
      setEmail('')
   }

   return (
      <section className="w-full bg-beige py-8 mt-[100px]!">
         <SectionContainer className="py-0 flex  w-full">
            <div className="grid sm:grid-cols-2 gap-8 size-full">
               <div className="space-y-3 self-center order-2 sm:order-1">
                  <Heading order={1} fw={500} className="text-primary">
                     Join our email list
                  </Heading>

                  <Paragraph className="text-muted">
                     Subheading that sets up context, shares more info about the website, or generally gets people
                     psyched to keep scrolling.
                  </Paragraph>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-6!">
                     <MTextInput
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-label="Email Address"
                        size="md"
                     />
                     <MButton onClick={() => console.log('')}>Email Now</MButton>
                  </form>
               </div>

               {/* Right side with images */}
               <div className="w-full order-1 sm:order-2 grid grid-cols-2 md:grid-cols-3 gap-3.5">
                  <div className="h-full md:col-span-2 rounded-md overflow-hidden w-full">
                     <Image
                        src={auctionImage}
                        alt="Wine bottles collection"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                     />
                  </div>
                  <div className="h-full flex-shrink-0 w-full rounded-md overflow-hidden">
                     <Image src={retailImage} alt="Person serving wine" className="size-full object-cover" />
                  </div>
               </div>
            </div>
         </SectionContainer>
      </section>
   )
}
