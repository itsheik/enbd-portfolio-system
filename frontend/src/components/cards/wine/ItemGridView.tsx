import { type FC } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { type Retail } from '@/src/interface/retail'
import { cn } from '@/src/lib'
import { setRetailSlice } from '@/src/store/features/retail/retailSlice'
import { wineBottle } from '@/src/utils/images/main-page'

import { Paragraph } from '../../ui'
import { StarSvg } from '../../ui/icons/svg-icons'

type ItemGridViewProps = {
   index: number
   wine?: Retail
}
export const ItemGridViewComponent: FC<ItemGridViewProps> = ({ index, wine }) => {
   const router = useRouter()
   const dispatch = useDispatch()

   return (
      <article aria-label="recommendation" className={'w-full min-[430px]:max-w-56'}>
         <div
            className={cn('relative flex justify-center rounded-lg items-center p-3 cursor-pointer', {
               'border-1 border-b-white-primary  bg-white': index % 2 === 1,
               'bg-beige': index % 2 === 0,
            })}
            onClick={() => {
               dispatch(
                  setRetailSlice({
                     retailWineDetails: wine,
                  }),
               )
               router.push(`/retail/wines/${wine?.winecatalogid}`)
            }}
         >
            {' '}
            <div className="flex items-center xl:gap-6 gap-4 h-[260px] sm:max-md:h-[210px] w-32 relative">
               <Image
                  alt="Bottle Shake"
                  src={wine?.imagethumb || wineBottle}
                  blurDataURL={wine?.imagethumb}
                  placeholder="blur"
                  fill
                  className="object-contain mix-blend-multiply brightness-125"
               />
            </div>
            {wine?.score.length && wine?.score !== '.' && (
               <div className="flex items-center gap-2 absolute  right-3 top-3">
                  <StarSvg className="text-table-head" />
                  <Paragraph className="text-red-secondary md:text-sm md:font-semibold">{wine?.score} RP</Paragraph>
               </div>
            )}
         </div>
         <div className="text-center ">
            <Paragraph className="font-gilda-display text-red-secondary">{wine?.winename}</Paragraph>
            <Paragraph className="text-c-red-primary font-inter font-semibold my-1">${wine?.price}</Paragraph>
            <button
               className="bg-c-red-primary cursor-pointer text-white px-4 py-2 rounded-lg uppercase text-sm font-medium"
               aria-label="Add to Cart"
               onClick={e => e.stopPropagation()}
            >
               Add to cart
            </button>
         </div>
      </article>
   )
}
