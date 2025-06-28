import InvoiceListTable from './InvoiceListTable'

type Props = object

const InvoiceList = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <InvoiceListTable />
      </div>
   )
}

export default InvoiceList
