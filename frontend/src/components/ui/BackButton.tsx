'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Back } from '@/src/utils/images/main-page'

import { Heading } from './typography'

const BackButton = () => {
   const router = useRouter()
   
return (
      <button className="flex gap-3 items-center cursor-pointer" onClick={() => router.back()}>
         <Image src={Back} alt="Bottle Shake" className="mb-0.5" />
         <Heading className="font-normal text-red-secondary ">Back</Heading>
      </button>
   )
}

export default BackButton
