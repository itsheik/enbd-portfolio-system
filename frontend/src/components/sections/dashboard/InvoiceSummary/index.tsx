import InvoiceSummaryTable from './InvoiceSummaryTable'

import GlobalHeading from '~/components/ui/Headings/GlobalHeading'

type Props = object

const InvoiceSummary = (props: Props) => {
   return (
      <div className="flex flex-col gap-3">
         <GlobalHeading title="Invoice Summary" />
         <InvoiceSummaryTable />
      </div>
   )
}

export default InvoiceSummary
