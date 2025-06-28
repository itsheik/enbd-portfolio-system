import AuctionSummary from '~/components/sections/dashboard/AuctionSummary'
import BidSummary from '~/components/sections/dashboard/BidSummary' 
import InvoiceSummary from '~/components/sections/dashboard/InvoiceSummary'

type Props = object

const Page = (props: Props) => {
   return (
      <section className="flex flex-col gap-4">
         <BidSummary />
         <AuctionSummary />
         <InvoiceSummary />
      </section>
   )
}

export default Page
