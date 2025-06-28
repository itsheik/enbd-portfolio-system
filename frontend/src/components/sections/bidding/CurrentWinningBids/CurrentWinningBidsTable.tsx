'use client'

import { MButton } from '@/src/components/ui'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { CURRENT_WINNING_BIDS_DATA } from '~/constants/dummyData'

type CurrentWinningBidsData = (typeof CURRENT_WINNING_BIDS_DATA)[0]

const CurrentWinningBidsTable = () => {
   const columns = [
      {
         key: 'lotNo' as const,
         label: 'Lot No',
         render: (item: CurrentWinningBidsData) => (
            <span className="text-primary text-xs block text-center">{item.lotNo}</span>
         ),
      },
      {
         key: 'desc' as const,
         label: 'Description',
         render: (item: CurrentWinningBidsData) => (
            <span className="text-primary text-xs block text-center">{item.desc}</span>
         ),
      },
      {
         key: 'date' as const,
         label: 'Date',
         render: (item: CurrentWinningBidsData) => (
            <span className="text-primary text-xs block text-center">{item.date}</span>
         ),
      },
      {
         key: 'bidding' as const,
         label: 'Bidding',
         render: (item: CurrentWinningBidsData) => (
            <TableActions
               pillData={{
                  variant: 'success',
                  value: 'Winning',
               }}
               showIcon={{
                  fileIcon: true,
               }}
            />
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<CurrentWinningBidsData>
            columns={columns}
            data={CURRENT_WINNING_BIDS_DATA}
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

export default CurrentWinningBidsTable
