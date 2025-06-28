'use client'

import { InternalLink, MButton } from '@/src/components/ui'

import TableActions from '../../TableActions'

import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { INVOICES_DATA } from '~/constants/dummyData'

type InvoicesData = (typeof INVOICES_DATA)[0]

const InvoiceListTable = () => {
   const columns = [
      {
         key: 'invNo' as const,
         label: 'Lot No',
         render: (item: InvoicesData) => <span className="text-primary text-xs block text-center">{item.invNo}</span>,
      },
      {
         key: 'date' as const,
         label: 'Date',
         render: (item: InvoicesData) => <span className="text-primary text-xs block text-center">{item.date}</span>,
      },
      {
         key: 'auction' as const,
         label: 'Auction',
         render: (item: InvoicesData) => <span className="text-primary text-xs block text-center">{item.auction}</span>,
      },
      {
         key: 'paddle' as const,
         label: 'Paddle',
         render: (item: InvoicesData) => <span className="text-primary text-xs block text-center">{item.paddle}</span>,
      },
      {
         key: 'status' as const,
         label: 'Status',
         render: (item: InvoicesData) => (
            <TableActions
               showIcon={{
                  pdfIcon: true,
               }}
               handlePdfClick={() => console.log('pdf')}
               pillData={{
                  value: item.status,
                  variant: 'warning',
               }}
            />
         ),
      },
      {
         key: 'options' as const,
         label: 'Options',
         render: (item: InvoicesData) => (
            <InternalLink variant="underlined" href="/" className="text-primary text-xs block text-center">
               {item.options}
            </InternalLink>
         ),
      },
   ]

   return (
      <section className="flex flex-col gap-4">
         <GlobalTable<InvoicesData>
            columns={columns}
            data={INVOICES_DATA}
            styles={{
               thStyle: 'py-2 px-3 text-center',
               tdStyle: 'py-2 px-3',
            }}
         />
         <MButton className="w-max self-end" onClick={() => console.log('hello')}>
            More
         </MButton>
      </section>
   )
}

export default InvoiceListTable
