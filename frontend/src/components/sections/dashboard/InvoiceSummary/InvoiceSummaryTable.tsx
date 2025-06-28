'use client'
import GlobalTable from '~/components/ui/Tables/GlobalTable'
import { INVOICE_SUMMARY } from '~/constants/dummyData'

type InvoiceData = (typeof INVOICE_SUMMARY)[0]

const InvoiceSummaryTable = () => {
   const columns = [
      {
         key: 'auction' as const,
         label: 'Auction',
         render: (item: InvoiceData) => <span className="text-primary text-xs block">{item.auction}</span>,
      },
      {
         key: 'invoiceNo' as const,
         label: 'Invoice No.ation',
         render: (item: InvoiceData) => <span className="text-primary text-xs block">{item.invoiceNo}</span>,
      },
      {
         key: 'date' as const,
         label: 'Date',
         render: (item: InvoiceData) => <span className="text-primary text-xs block">{item.date}</span>,
      },
      {
         key: 'status' as const,
         label: 'Status',
         render: (item: InvoiceData) => <span className="text-primary text-xs block">{item.status}</span>,
      },
      {
         key: 'detail' as const,
         label: 'Detail',
         render: (item: InvoiceData) => (
            <div className="text-red-primary text-xs">
               <button className="text-xs cursor-pointer">View Detail </button> /{' '}
               <button className="text-xs cursor-pointer">Pay invoice</button>
            </div>
         ),
      },
      {
         key: 'option' as const,
         label: 'Option',
         render: (item: InvoiceData) => (
            <div className="text-red-primary text-xs">
               <button className="text-xs cursor-pointer">Add from retail store</button>
            </div>
         ),
      },
   ]

   return (
      <GlobalTable<InvoiceData>
         columns={columns}
         data={INVOICE_SUMMARY}
         styles={{
            thStyle: 'py-2 px-3 text-left',
            tdStyle: 'py-2 px-3',
         }}
      />
   )
}

export default InvoiceSummaryTable
