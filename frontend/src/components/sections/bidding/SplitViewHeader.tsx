'use client'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'

import { useQueryParam } from '@/src/hooks/useQueryParam'
import { updateQueryParams } from '@/src/hooks/useUpdateQueryParams'
import { cn } from '@/src/lib'

import { MButton } from '../../ui'
import { SearchSvg } from '../../ui/icons/svg-icons'
import GlobalInput from '../../ui/Inputs'

type Props = object

const SplitViewHeader = (props: Props) => {
   const selectedView = useQueryParam('selectedView')

   const debouncedUpdateSectionQuery = useCallback(
      debounce((value: string) => {
         updateQueryParams('selectedView', value || null)
      }, 0),
      [],
   )

   const debouncedUpdateSearchQuery = useCallback(
      debounce((value: string) => {
         updateQueryParams('search', value || null)
      }, 0),
      [],
   )

   useEffect(() => {
      if (!selectedView) {
         debouncedUpdateSectionQuery('combined')
      }
   }, [])

   return (
      <div className="grid grid-cols-4 gap-4 items-center justify-between">
         <GlobalInput
            placeholder="Search.."
            className="lg:col-span-1 sm:col-span-2 col-span-4"
            leftSection={<SearchSvg className="text-red-secondary" />}
            onChange={value => debouncedUpdateSearchQuery(value)}
         />

         <MButton
            className={cn(
               'md:col-start-3 max-sm:col-span-2 bg-white text-red-secondary rounded-xl border border-red-secondary',
               {
                  'bg-red-secondary text-white': selectedView === 'combined',
               },
            )}
            onClick={() => debouncedUpdateSectionQuery('combined')}
         >
            Combined View
         </MButton>
         <MButton
            className={cn(
               'md:col-start-4 max-sm:col-span-2 bg-white text-red-secondary rounded-xl border border-red-secondary',
               {
                  'bg-red-secondary text-white': selectedView === 'split',
               },
            )}
            onClick={() => debouncedUpdateSectionQuery('split')}
         >
            Split View
         </MButton>
      </div>
   )
}

export default SplitViewHeader
