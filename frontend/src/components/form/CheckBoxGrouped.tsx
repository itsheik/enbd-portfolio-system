'use client'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { cn } from '@/src/lib'

type Option = {
   label: string
   count?: number
   value: string
}

type FilterOptionProps = {
   options: Option[]
   queryName: string
   styles?: {
      container?: string
      label?: string
      checkbox?: string
      count?: string
   }
}

const FilterOption: React.FC<FilterOptionProps> = ({ options, queryName, ...props }) => {
   const hasValue = useQueryParam(queryName)

   const handleToggle = (value: string) => {
      if (hasValue === value) updateQueryParams(queryName, null)
      else updateQueryParams(queryName, value)
   }

   return (
      <div className={cn('space-y-2', props.styles?.container)}>
         {options.map((option, i) => {
            const isSelected = hasValue === option.value

            return (
               <label
                  key={i}
                  className="flex items-center justify-between cursor-pointer text-b-white-secondary font-inter "
               >
                  <div className="flex items-center space-x-2">
                     <span
                        className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                           isSelected ? 'bg-primary border-primary' : 'border-gray-400'
                        }`}
                     >
                        {isSelected && <span className="w-1 h-1 bg-table-head rounded-full" />}
                     </span>
                     <span className="text-xs">{option.label}</span>
                  </div>
                  {option.count ? <span className="text-xs text-gray-500">({option.count})</span> : null}
                  <input
                     type="checkbox"
                     checked={isSelected}
                     onChange={() => handleToggle(option.value)}
                     className="hidden"
                  />
               </label>
            )
         })}
      </div>
   )
}

export default FilterOption
