'use client'
import Image from 'next/image'
import { useState } from 'react'

import WineBottle from '~/assets/images/wine-bottle.png'
import { Heading, InternalLink, MAnchor, Paragraph } from '~/components/ui'
import IconInput from '../form/IconInput'
export const EmailListing = () => {
   const [email, setEmail] = useState('')

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle email submission logic here
      console.log('Email submitted:', email)
      setEmail('')
   }
   return (
      <article
         aria-label="recommeauction price list card"
         className="w-full flex items-start flex-col  bg-beige  px-4 py-6 mb-4 rounded-lg"
      >
         <Heading order={2} className="text-xl font-normal ">
            Join our Email Lisiting
         </Heading>
         <form onSubmit={handleSubmit} className="w-full"></form>
         <IconInput />
         <button className="bg-primary text-white px-10 py-1 rounded-lg text-sm block  mt-1.5 cursor-pointer">
            Sent
         </button>
      </article>
   )
}
