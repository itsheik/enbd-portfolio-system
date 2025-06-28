'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { ImageCaroselComponent } from '@/src/components/cards/ImageCarosel'
import { useAddToCartData } from '@/src/hooks/cart/useCartData'
import { cn } from '@/src/lib'
import { selectRetailSlice, setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { Back } from '@/src/utils/images/main-page'

import QuantityBox from '../../ui/QuantityBox'

import { Heading, MButton, Paragraph } from '~/components/ui'

const RetailProductDetails = () => {
   const router = useRouter()
   const dispatch = useDispatch()
   const params = useParams()

   const { retailWineDetails } = useSelector(selectRetailSlice)
   const [selectedSize, setSelectedSize] = useState(retailWineDetails?.bottlesize)
   const [quantity, setQuantity] = useState(1)

   useEffect(() => {
      if (retailWineDetails) {
         if (String(params.id) !== retailWineDetails.winecatalogid.toString()) {
            dispatch(
               setRetailSlice({
                  retailWineDetails: null,
               }),
            )

            router.back()
         }
      }
   }, [params])

   if (!retailWineDetails) {
      router.back()

      return <></>
   }

   const { isAddRetailItemToCartLoading, handleAddRetailItemToCart } = useAddToCartData({
      wine: retailWineDetails,
      quantity,
   })

   return (
      <div className="mb-24">
         <button className="flex gap-3 items-center cursor-pointer" onClick={() => router.back()}>
            <Image src={Back} alt="Bottle Shake" className="mb-0.5" />
            <Heading className="font-normal">Back</Heading>
         </button>
         <div className="grid grid-cols-[33%_67%] w-full max-[1000px]:grid-cols-1">
            <div className="max-w-[488px] w-full max-[1000px]:max-w-full">
               <ImageCaroselComponent images={[retailWineDetails.imageoriginal]} />
            </div>
            <div className="pl-8 w-full flex flex-col justify-between">
               <div className="flex flex-col gap-4">
                  <div className="border-b border-b-b-white-primary pb-4">
                     <Heading className="font-gilda-display font-normal text-red-secondary text-3xl">
                        {retailWineDetails.synonym}
                     </Heading>
                     <Paragraph className="text-b-white-secondary font-light text-base mt-4">
                        Brand : {retailWineDetails.varietal}
                     </Paragraph>
                  </div>
                  <div>
                     <Paragraph className="font-light md:text-base">{retailWineDetails.maindescription}</Paragraph>
                     <Paragraph className="font-semibold md:text-base ">
                        Only {retailWineDetails.available} Remaining In Stock
                     </Paragraph>
                  </div>
                  <div>
                     <Paragraph className="font-semibold text-sm text-b-white-secondary">
                        <span className="text-primary">SIZE:</span> {selectedSize}
                     </Paragraph>
                     <div className="flex gap-2">
                        {[retailWineDetails.bottlesize].map((size, i) => {
                           return (
                              <MButton
                                 key={i}
                                 // className={cn("bg-transparent border-b-white-primary text-b-white-secondary"),{}}
                                 onClick={() => {
                                    setSelectedSize(size)
                                 }}
                                 className={cn('bg-transparent border-b-white-primary text-b-white-secondary', {
                                    'bg-table-head text-white': selectedSize === size,
                                 })}
                              >
                                 {size}
                              </MButton>
                           )
                        })}
                     </div>
                  </div>
                  <Paragraph className="text-c-red-primary font-inter font-bold md:text-2xl">
                     ${retailWineDetails.price}
                  </Paragraph>
                  <div className="flex flex-col gap-2">
                     <Paragraph className="text-b-white-secondary font-light  md:text-sm">
                        Delivered within 2-3 days
                     </Paragraph>

                     <QuantityBox quantity={quantity} setQuantity={setQuantity} />

                     <MButton
                        loading={isAddRetailItemToCartLoading}
                        onClick={handleAddRetailItemToCart}
                        className="w-max cursor-pointer uppercase font-semibold"
                     >
                        Add to cart
                     </MButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default RetailProductDetails
