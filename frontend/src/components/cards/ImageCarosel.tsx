'use client'
import { type FC, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'

type ImageCaroselProps = {
   images?: string[] | StaticImageData[]
}

export const ImageCaroselComponent: FC<ImageCaroselProps> = ({ images }) => {
   const [selectedImage, setSelectedImage] = useState(images?.[0] || '')

   return (
      <div className="w-full max-w-[417px] mt-5 border-r-2 max-[1000px]:max-w-full max-[1000px]:border-r-0">
         <div className="w-full">
            <Image
               src={selectedImage}
               alt="Selected product image"
               width={400}
               height={500}
               className="h-[500px] w-full object-contain"
            />
         </div>
         <div className="flex gap-3 mt-4 max-[1000px]:justify-center">
            {images?.map((item, id: number) => (
               <Image
                  key={id}
                  src={item}
                  alt={`Thumbnail ${id + 1}`}
                  onClick={() => setSelectedImage(item)}
                  width={400}
                  height={400}
                  className={` w-28 h-[141px] object-contain p-4 border rounded-sm cursor-pointer ${
                     selectedImage === item ? 'bg-beige' : 'bg-transparent'
                  }`}
               />
            ))}
         </div>
      </div>
   )
}
