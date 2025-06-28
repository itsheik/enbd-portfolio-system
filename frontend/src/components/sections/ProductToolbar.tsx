'use client'

import { useDispatch, useSelector } from 'react-redux'

import { useIsPathSegmentPresent } from '@/src/hooks/useIsPathSegmentPresent'
import { cn } from '@/src/lib'
import { selectAuctionLotListing } from '@/src/store/features/auction/auctionSlice'
import { selectRetailFiltersViewMode, setRetailFilter } from '@/src/store/features/filters/RetailFilterSlice'

import { GridViewSvg, ListViewSvg } from '../ui/icons/svg-icons'

import PaginationCard from '~/components/pagination/PaginationCard'
import { Paragraph } from '~/components/ui'

type ProductToolbarProps = {
   totalItems?: number
}

const ProductToolbar = (props: ProductToolbarProps) => {
   const dispatch = useDispatch()
   const auctionLotListings = useSelector(selectAuctionLotListing)
   const isAuctions = useIsPathSegmentPresent('auctions')
   const viewMode = useSelector(selectRetailFiltersViewMode)
   const handleViewModeChange = (mode: 'grid' | 'list') => {
      dispatch(setRetailFilter({ key: 'viewMode', value: mode }))
   }

   // Calculate total pages based on total items (8 items per page)
   const totalPages = props.totalItems ? Math.ceil(props.totalItems / 8) : 0

   return (
      <section className="space-y-24 w-full">
         <div className="w-full px-6 py-2.5 bg-beige mb-1 flex justify-between items-center">
            <div className="flex gap-2.5 items-center">
               {isAuctions ? (
                  <div>
                     <ListViewSvg />
                  </div>
               ) : (
                  <div className="flex items-center gap-3">
                     <button onClick={() => handleViewModeChange('grid')}>
                        <GridViewSvg
                           className={cn('text-b-white-primary cursor-pointer', {
                              ' text-red-secondary': viewMode === 'grid',
                           })}
                        />
                     </button>{' '}
                     <button onClick={() => handleViewModeChange('list')}>
                        <ListViewSvg
                           className={cn('text-b-white-primary cursor-pointer', {
                              ' text-red-secondary': viewMode === 'list',
                           })}
                        />
                     </button>
                  </div>
               )}
               {isAuctions ? (
                  <Paragraph className="font-normal md:text-sm text-b-white-primary leading-6">
                     There are {auctionLotListings?.total} Products
                  </Paragraph>
               ) : (
                  <Paragraph className="font-normal md:text-sm text-b-white-primary leading-6">
                     There are no Products
                  </Paragraph>
               )}
            </div>
         </div>
         <div className="w-full flex items-center justify-between mb-3 max-md:flex-col max-md:items-start">
            {totalPages > 0 ? (
               <div className="flex gap-2.5">
                  <PaginationCard totalPages={totalPages} />
               </div>
            ) : (
               <div />
            )}
            {/* {isAuctions ? (
               <div>
                  <button className="font-light bg-primary text-white px-7 py-2.5 rounded-lg text-sm block  mt-1.5 cursor-pointer">
                     Submit All Bids
                  </button>
               </div>
            ) : null} */}
         </div>
      </section>
   )
}

export default ProductToolbar
