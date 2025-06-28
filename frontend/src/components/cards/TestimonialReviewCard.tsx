'use client'
import React from 'react'
import { Progress } from '@mantine/core'

import { cn } from '@/src/lib'

import { Heading, Paragraph } from '../ui'
import { StarSvg } from '../ui/icons/svg-icons'

const TestimonialReviewCard = () => {
   const progressValue = [
      {
         value: 60,
         rating: 5,
      },
      {
         value: 50,
         rating: 4,
      },
      {
         value: 40,
         rating: 3,
      },
      {
         value: 20,
         rating: 2,
      },
   ]

   return (
      <section className="bg-beige rounded-lg py-4 px-5">
         <Heading order={2} className="font-gilda-display text-red-secondary font-normal text-3xl">
            Review
         </Heading>
         <div className="w-full h-[1px] bg-b-white-secondary my-3"></div>
         <div className="w-full flex gap-8">
            <div className="w-full max-w-40 flex items-center flex-col justify-center">
               <Heading order={3} className="text-red-secondary font-inter text-4xl font-semibold">
                  4.0
               </Heading>
               <div className="flex my-1.5">
                  {[0, 1, 2, 3, 4].map(i => {
                     return (
                        <StarSvg
                           key={i}
                           className={cn(' text-table-head', {
                              'text-transparent': i > 4,
                           })}
                        />
                     )
                  })}
               </div>
               <Paragraph className="font-inter text-b-white-secondary">35K Rating</Paragraph>
            </div>
            <div className="w-full">
               <div>
                  {progressValue?.map((item, i) => {
                     return (
                        <div key={i} className="flex justify-between items-center w-full  gap-6">
                           <Progress value={item.value} className="w-full max-w-[1140px] " color="yellow" />
                           <Paragraph className="font-inter text-b-white-secondary md:text-base md:font-light">
                              {item.rating} Rating
                           </Paragraph>
                        </div>
                     )
                  })}
               </div>
               <div></div>
            </div>
         </div>
      </section>
   )
}

export default TestimonialReviewCard
