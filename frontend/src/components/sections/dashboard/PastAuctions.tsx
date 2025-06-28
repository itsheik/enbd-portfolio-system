'use client'
import { useState } from 'react'

import SelectDropdown from '../../form/Dropdown'

import { MButton } from '~/components/ui'
import SidebarCard from '~/components/ui/Cards/SidebarCard'

type Props = object

const PastAuctions = (props: Props) => {
   const [sortBy, setSortBy] = useState('relevence')

   return (
      <SidebarCard title="Past Auctions" bodyStyle="flex flex-col gap-4">
         <SelectDropdown
            name="search"
            value={sortBy}
            onChange={setSortBy}
            options={[
               { label: 'Search', value: '...' },
               { label: 'Top Rated', value: 'topRated' },
               { label: 'Price (Low to High)', value: 'lowToHigh' },
            ]}
         />
         <MButton className="max-w-36 self-center" onClick={() => console.log('')}>
            LOAD
         </MButton>
      </SidebarCard>
   )
}

export default PastAuctions
