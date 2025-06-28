'use client'

import Image, { type StaticImageData } from 'next/image'

type ArticleCardProps = {
   title: string
   imageSrc: StaticImageData | string | ''
}

const ServicesCard: React.FC<ArticleCardProps> = ({ title, imageSrc }) => {
   return (
      <article className="w-[243px] h-[213px] rounded-3xl overflow-hidden shadow-md relative">
         <div className="relative w-full h-full">
            <Image src={imageSrc} alt={title} fill className="object-cover z-0" />
         </div>
         <div className="bg-table-head-muted uppercase absolute left-0 bottom-0 right-0 text-white text-base font-semibold flex items-center justify-center h-[47px] z-50">
            {title}
         </div>
      </article>
   )
}

export default ServicesCard
