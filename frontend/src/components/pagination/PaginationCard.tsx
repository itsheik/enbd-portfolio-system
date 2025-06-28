'use client'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'

type PaginationProps = {
   totalPages: number
}

export default function Pagination({ totalPages }: PaginationProps) {
   const currentPage = Number(useQueryParam('page')) || 1

   const goToPage = (page: number) => {
      if (page === currentPage) return
      updateQueryParams('page', page.toString())
   }

   const pagesToShow: number[] = []

   if (currentPage > 1) pagesToShow.push(currentPage - 1)
   pagesToShow.push(currentPage)
   if (currentPage < totalPages) pagesToShow.push(currentPage + 1)

   return (
      <div className="flex space-x-2 mt-4">
         {/* Previous Arrow */}
         {currentPage > 1 ? (
            <button
               onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
               className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
               disabled={currentPage === 1}
            >
               &lt;
            </button>
         ) : null}

         {/* Dynamic Pages */}
         {pagesToShow.map(pageNum => {
            const isActive = pageNum === currentPage

            return (
               <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                     isActive ? 'bg-[#550000] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
               >
                  {pageNum}
               </button>
            )
         })}

         {/* Next Arrow */}
         <button
            onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
         >
            &gt;
         </button>
      </div>
   )
}
