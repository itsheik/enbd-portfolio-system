'use client'

import { MButton } from '@/src/components/ui'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { CURRENT_SELLING_DATA } from '~/constants/dummyData'

type CurrentSellingData = (typeof CURRENT_SELLING_DATA)[0]

const CurrentSellingTable = () => {
   const columns = [
      {
         key: 'auction' as const,
         label: 'Auction',
         render: (item: CurrentSellingData) => (
            <span className="text-primary text-xs block text-center">{item.auction}</span>
         ),
      },
      {
         key: 'lot' as const,
         label: 'Lot',
         render: (item: CurrentSellingData) => (
            <span className="text-primary text-xs block text-center">{item.lot}</span>
         ),
      },
      {
         key: 'name' as const,
         label: 'Name',
         render: (item: CurrentSellingData) => (
            <span className="text-primary text-xs block text-center">{item.name}</span>
         ),
      },
      {
         key: 'currentBid' as const,
         label: 'Current Bid',
         render: (item: CurrentSellingData) => (
            <span className="text-primary text-xs block text-center">{item.currentBid}</span>
         ),
      },
      {
         key: 'reserve' as const,
         label: 'Reserve',
         render: (item: CurrentSellingData) => (
            <span className="text-primary text-xs block text-center">{item.reserve}</span>
         ),
      },
      {
         key: 'sold' as const,
         label: 'Sold',
         render: (item: CurrentSellingData) => (
            <TableActions
               pillData={{
                  variant: 'warning',
                  value: item.sold,
               }}
            />
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<CurrentSellingData>
            columns={columns}
            data={CURRENT_SELLING_DATA}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
         />
         <MButton className="w-max self-end" onClick={() => console.log('hello')}>
            See All Items
         </MButton>
      </section>
   )
}

export default CurrentSellingTable
