'use client'

import { MButton } from '@/src/components/ui'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { WATCHING_LOT_DATA } from '~/constants/dummyData'

type WatchingLotData = (typeof WATCHING_LOT_DATA)[0]

const WishListTable = () => {
   const columns = [
      {
         key: 'lotNo' as const,
         label: 'Lot No',
         render: (item: WatchingLotData) => (
            <span className="text-primary text-xs block text-center">{item.lotNo}</span>
         ),
      },
      {
         key: 'description' as const,
         label: 'Description',
         render: (item: WatchingLotData) => (
            <span className="text-primary text-xs block text-center">{item.description}</span>
         ),
      },
      {
         key: 'bidding' as const,
         label: 'Bidding',
         render: (item: WatchingLotData) => (
            <TableActions
               text="$4200"
               showIcon={{
                  deleteIcon: true,
                  fileIcon: true,
               }}
               handleDeleteClick={() => console.log('delete')}
               handleFileClick={() => console.log('file')}
            />
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<WatchingLotData>
            columns={columns}
            data={WATCHING_LOT_DATA}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
         />
         <MButton className="w-max self-end" onClick={() => console.log('hello')}>
            Submit All Bids
         </MButton>
      </section>
   )
}

export default WishListTable
