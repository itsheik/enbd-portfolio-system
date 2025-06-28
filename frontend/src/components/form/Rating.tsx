'use client'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { type ISelectLabel } from '@/src/interface'

interface RatingFilterProps {
   ratings: ISelectLabel[] // can be number or string
   queryName: string
}

const RatingFilter: React.FC<RatingFilterProps> = ({ ratings, queryName }) => {
   const hasValue = useQueryParam(queryName)
 
   const handleClick = (value: string) => {
      if (hasValue === value) updateQueryParams(queryName, null)
      else updateQueryParams(queryName, value)
   }

   return (
      <div className="flex flex-wrap gap-2 py-2">
         {ratings.map((rating, index) => {
            const ratingStr = rating.value.toString()
            const isActive = hasValue === ratingStr

            return (
               <button
                  id={queryName}
                  key={index}
                  onClick={() => handleClick(rating.value)}
                  className={`px-2 py-1 rounded-lg border text-sm font-normal text-table-head cursor-pointer
              ${isActive ? 'bg-primary  border-primary' : 'bg-white  border-gray-400 hover:bg-gray-100'}
            `}
               >
                  {rating.label}
               </button>
            )
         })}
      </div>
   )
}

export default RatingFilter
