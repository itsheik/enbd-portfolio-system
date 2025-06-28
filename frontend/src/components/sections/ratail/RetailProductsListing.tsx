'use client'

import { useSelector } from 'react-redux'

import { ItemGridViewComponent } from '@/src/components/cards/wine/ItemGridView'
import { ItemListViewComponent } from '@/src/components/cards/wine/ItemListView'
import Pagination from '@/src/components/pagination/PaginationCard'
import ProductToolbar from '@/src/components/sections/ProductToolbar'
import { Paragraph } from '@/src/components/ui'
import { useRetailData } from '@/src/hooks/retail/useRetailData'
import { selectRetailFiltersViewMode } from '@/src/store/features/filters/RetailFilterSlice'

import Loader from '../../ui/Loader'

const RetailProductsListing = () => {
   const viewMode = useSelector(selectRetailFiltersViewMode)
   const { retailWineListing, isLoading } = useRetailData()

   return (
      <div className="w-full">
         {retailWineListing?.total ? <ProductToolbar totalItems={retailWineListing?.total} /> : null}

         {isLoading ? (
            <div className="max-h-screen self-center h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : retailWineListing && retailWineListing.retail.length && viewMode === 'list' ? (
            <div className="flex gap-3 flex-col w-full">
               {retailWineListing?.retail.map((wine, id) => {
                  return <ItemListViewComponent key={id} index={id} wine={wine} />
               })}
            </div>
         ) : retailWineListing && retailWineListing.retail.length ? (
            <>
               <div className="grid grid-cols-4 gap-4 w-full max-[1070px]:grid-cols-3 max-[700px]:grid-cols-2 max-[430px]:grid-cols-1">
                  {retailWineListing?.retail.map((wine, id) => {
                     return <ItemGridViewComponent key={id} index={id} wine={wine} />
                  })}
               </div>

               <div className="flex justify-between items-center mt-7">
                  <Paragraph className="md:text-sm font-light text-b-white-secondary">
                     Showing 1-12 of 20 item(s)
                  </Paragraph>
                  <Pagination totalPages={20} />
               </div>
            </>
         ) : (
            <div className="max-h-screen self-center h-full flex justify-center items-center">No Listing Available</div>
         )}
      </div>
   )
}

export default RetailProductsListing
