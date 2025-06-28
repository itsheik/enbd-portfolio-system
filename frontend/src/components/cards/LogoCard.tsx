'use client'
import Image, { StaticImageData } from 'next/image'
import { type FC } from 'react'

type LogoCardProps = {
   image: string | StaticImageData
}
export const LogoCard: FC<LogoCardProps> = ({ image }) => {
   return (
      <article className="max-w-[192px] w-full bg-beige flex items-center justify-center rounded-lg h-full">
         <Image src={image} alt="wine footer" placeholder="blur" className="py-5" />
      </article>
   )
}
