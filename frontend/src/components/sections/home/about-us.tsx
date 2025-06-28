'use client'
import { type MantineSize } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { routes } from '@/src/constants'

import { Heading, MButton, Paragraph } from '../../ui'
import { SectionContainer } from '../section-container'

import aboutUsImg from '~/assets/images/about-us-image.webp'

export const AboutUs = () => {
   const matches = useMediaQuery('(min-width: 47.93em)')
   const btnSize: MantineSize = matches ? 'md' : 'sm'
   const router = useRouter()

   return (
      <SectionContainer aria-labelledby="about-heading">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* Left side - Image */}
            <div className="relative h-full w-full aspect-video md:aspect-square md:h-[500px] rounded-md overflow-hidden">
               <Image
                  src={aboutUsImg}
                  alt="Collection of premium spirits including tequila and liqueurs displayed on a wooden shelf with a warm bar backdrop"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               />
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col justify-center h-full space-y-4 md:space-y-8 pt-2">
               <Heading
                  id="about-heading"
                  className="text-xl border-y w-fit border-amber-500 py-2 sm:text-2xl md:text-3xl text-primary"
               >
                  About Us
               </Heading>

               <div className="space-y-4">
                  <Paragraph fw={300}>
                     Body text for your whole article or post. We&lsquo;ll put in some lorem ipsum to show how a
                     filled-out page might look:
                  </Paragraph>

                  <Paragraph fw={300}>
                     Excepteur efficient emerging, minim veniam anim aute, carefully curated Ginza conversation
                     exquisite perfect, nostrud nisi intricate Content. Qui, international first-class, nulla ut.
                     Punctual adipisicing, essential lovely queen tempor, eiusmod irure. Exclusive izakaya charming
                     Scandinavian, impeccable aute quality of life soft power pariatur Melbourne, occaecat discerning.
                     Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur. Basset
                     hound, Zürich sleepy perfect consectetur.
                  </Paragraph>
               </div>

               <MButton className="self-start" size={btnSize} isInternal route={routes.about}>
                  View Details
               </MButton>
            </div>
         </div>
      </SectionContainer>
   )
}
