import { type FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAddToCartData } from '@/src/hooks/cart/useCartData'
import { type Retail } from '@/src/interface/retail'
import { cn } from '@/src/lib'
import { setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { wineBottle } from '@/src/utils/images/main-page'

import { Heading, MButton, Paragraph } from '../../ui'
import { StarSvg } from '../../ui/icons/svg-icons'
import QuantityBox from '../../ui/QuantityBox'

type ItenListViewProps = {
   index: number
   wine?: Retail
}
export const ItemListViewComponent: FC<ItenListViewProps> = ({ wine, index }) => {
   const router = useRouter()
   const dispatch = useDispatch()
   const [quantity, setQuantity] = useState(1)

   const { isAddRetailItemToCartLoading, handleAddRetailItemToCart } = useAddToCartData({
      wine,
      quantity,
   })

   return (
      <article
         aria-label="recommendation"
         className={cn('w-full relative flex justify-center rounded-lg items-center p-3', {
            'border-1 border-b-white-primary  bg-white': index % 2 === 1,
            'bg-beige': index % 2 === 0,
         })}
      >
         <div
            className="w-full flex items-center xl:gap-6 gap-4 cursor-pointer max-[750px]:flex-col"
            onClick={() => {
               dispatch(
                  setRetailSlice({
                     retailWineDetails: wine,
                  }),
               )
               router.push(`/retail/wines/${wine?.winecatalogid}`)
            }}
         >
            <div className="flex items-center gap-6 h-[260px] sm:max-md:h-[210px] w-32 relative">
               <Image
                  src={wine?.imagethumb || wineBottle}
                  alt="Bottle Shake"
                  blurDataURL={wine?.imagethumb}
                  placeholder="blur"
                  fill
                  className="object-contain mix-blend-multiply brightness-125"
                  sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  100vw"
               />
            </div>
            <div className="w-[1px] h-[187px] bg-[#8282826B] max-[750px]:w-full max-[750px]:h-[1px]"></div>
            <div className="w-full  flex flex-col items-center justify-between gap-4">
               <div className=" w-full flex flex-col items-start gap-2.5">
                  <div className="flex items-center justify-between w-full ">
                     <Heading order={3} className="font-gilda-display font-normal text-red-secondary text-xl">
                        {wine?.winename}
                     </Heading>
                     {wine?.score.length && wine?.score !== '.' && (
                        <div className="flex justify-between items-center gap-1 ">
                           <StarSvg className="text-table-head" />
                           <Heading className="font-gilda-display font-bold text-red-secondary text-base leading-0">
                              {wine?.score + 'RP'}
                           </Heading>
                        </div>
                     )}
                  </div>

                  <Paragraph className="font-light md:text-base">{wine?.synonym}</Paragraph>
                  <Paragraph className="font-semibold md:text-base ">
                     Only {wine?.available} Remaining In Stock
                  </Paragraph>
                  <Paragraph className="text-c-red-primary font-inter font-semibold md:text-xl">
                     ${wine?.price || 0}
                  </Paragraph>

                  <QuantityBox quantity={quantity} setQuantity={setQuantity} />
               </div>
               <div className="flex justify-between w-full max-[750px]:items-center">
                  <Paragraph className="text-b-white-secondary font-light transform -translate-y-1/2 translate-x-1/2 md:text-sm max-[750px]:-translate-y-0 max-[750px]:translate-x-0 max-[450px]:text-[12px]">
                     Delivered within 2-3 days
                  </Paragraph>
                  <MButton
                     loading={isAddRetailItemToCartLoading}
                     aria-label="Add to Cart"
                     onClick={e => {
                        e.stopPropagation()
                        handleAddRetailItemToCart()
                     }}
                  >
                     Add to cart
                  </MButton>
               </div>
            </div>
         </div>
      </article>
   )
}
